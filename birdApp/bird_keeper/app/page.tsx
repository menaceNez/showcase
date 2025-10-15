import Image from "next/image";

export default async function Page() {
  // () - groupings allow jsx {} inside, but () is used for returning html or js to the client
  // grouping is specifically used for multiline jsx that may be returned
  // use server ensures that code is not bundled for the client (client side js/ts code)
  return (
    <div className="flex items-center flex-col text-white w-[100%] h-[90%]">
      <div className={"bg-black/95 overflow-auto pb-5 px-8 w-[80%] h-[100%]"}>
        <h1 className="w-full text-center text-2xl mt-2 mb-2">
          Welcome to Bird Keeper
        </h1>
        <div className="flex justify-center w-full items-center">
          <div className="flex items-center px-4 overflow-auto">
            {/* <Image src={"/nextjs.jpg"} alt={"nextjsImg"} width={152} height={152} className="object-cover"/>
            <Image src={"/docker.png"} alt={"dockerImg"} width={152} height={152} className="object-cover"/>
            <Image src={"/postgres.png"} alt={"postgresImg"} width={152} height={152} className="object-cover"/> */}
            <Image
              src="/nextjs.jpg"
              alt={"hey"}
              width={170}
              height={170}
            ></Image>
            <Image
              src="/docker.png"
              alt={"hey"}
              width={150}
              height={150}
            ></Image>
            <Image
              src="/postgres.png"
              alt={"hey"}
              width={150}
              height={150}
            ></Image>
            <Image
              src="/react.png"
              alt={"hey"}
              width={150}
              height={150}
            ></Image>
            {/* <img src={"nextjs.jpg"} alt="NextjsLogo" className="w-38 h-38 object-cover"></img>
            <img src={"docker.png"} alt="NextjsLogo" className="w-38 h-38 object-cover mx-2"></img>
            <img src={"postgres.png"} alt="NextjsLogo" className="w-38 h-38 object-cover"></img>
            <img src={"react.png"} alt="NextjsLogo" className="w-38 h-38 object-cover"></img> */}
          </div>
        </div>
        <h1 className="w-full text-center text-2xl mt-2">Why Bird Keeper:</h1>
        <p className=" w-full px-4 pt-2 indent-2">
          Bird Keeper was designed as a playground for me to learn Nextjs, React
          and Postgresql. Nextjs is a React framework that allows react
          components to be sent via SSR (Server-Side Rendering) or Client-Side
          Rendering, Nextjs also provides a frontend framework and a backend
          framework. Bird Keeper also taught me about Docker as development of
          this app occured on multiple different machines and operating systems
          such as Windows 10, Fedora 41, and Ubuntu 24.04. So having a container
          that can host the database along with an init.sql to have each machine
          interacting with the same database has been important to ensure a
          smooth development process.
        </p>
        <h1 className="w-full text-center text-2xl mt-2">
          Functions of the App:
        </h1>
        <p className="px-4 indent-2 pt-2">
          The purpose of the app is to allow a user to register for an account,
          login, and be able to search for birds and add them to a list called
          the users saved birds. Before saving a bird, the user is able to set a
          location string denoting where they have seen the bird before. This
          location string is also versatile in that its more of a note that will
          be seen when they go to look at their saved birds. The saved birds are
          able to be deleted from the favorites along with the ability to update
          the location they previously set. Currently this is the extent of the
          app, but it has taught me an incredible amount in relation to nextjs
          docker and postgres along with react
        </p>
        <h1 className="w-full text-center text-2xl mt-2">
          Needed Improvements:
        </h1>
        <p className="px-4 indent-2 pt-2">
          Need to move various componenets from serverside to client side,
          including the navbar and bird table list. These not being client
          components dont allow for reactivity as server side components are not
          able to use react hooks... :
        </p>
      </div>
    </div>
  );
}
