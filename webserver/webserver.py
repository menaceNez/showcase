import sys
import socket
import os


# Parses current file type 
# and converts it into Content-type: field
def parseCT(filetype):
    if filetype == "html":
        filetype = "text/html"
        return (filetype, False)
    elif filetype == "txt":
        filetype = "text/plain"
        return (filetype, False)
    elif filetype == "ico":
        return (filetype, True)
    elif filetype == '':
        filetype = "text/html"
        return (filetype, True)
    else:
        return (filetype, False)
# Tests the passed response for http protocol header end 
# crlf = carret return line feed(\r\n\r\n)
def testcrlf(response, pattern): 
    resp = bytes(response)
    str = resp.decode()
    index = -1
    while True:
        index = str.find(pattern, 0)
        if index:
            return True
        else:
            return False

def create_header(filename, giveRoot):
    try:
        data = b''
        with open(filename, "rb") as fp:
            data = fp.read() # Read entire file 
        # Send a successful request 
        respond = f"HTTP/1.1 200 OK\r\nContent-Type: {giveRoot[0]}; charset=iso-8859-1\r\nContent-Length: {len(data)}\r\nConnection: close\r\n\r\n"
    except:
        # Send a File not found 404 error
        respond = f"HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: 13\r\nConnection: close\r\n\r\n404 not fougd"
    respond += data.decode()
    return respond


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 webserver.py <port>\nNumber Args:", len(sys.argv))
        exit(1)

    while True: # keep serving requests while up
    # Create a socket with ipv4 and tcp with ipv4 and tcp with ipv4 and tcp
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    # Set socket options to 
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) # SO_REUSEADDR will force a bind to that socket.

        host = ''
        port = int(sys.argv[1]) 
        bindtuple = (host, port) # create tuple for bind
        ret = sock.bind(bindtuple) # Bind to a address(ipaddr:socket) NOTE: socket.bind(()) requires a tuple

        sock.listen() # Listen on the socket
        new_conn = sock.accept() # accept incoming connections in a blocking manner
        # Use new socket from accept()'s tuple return 
        new_sock = new_conn[0] # accept() returns a tuple(socket, address)

        print("Connection receieved from:",new_conn[1][0],new_conn[1][1])
        print("aye ", os.getcwd())
        # Begin receiving and parsing user data
        pattern = "\r\n\r\n"
        response = b'' # Declare a bytes() object
        while True: # recv while msg > 0
            msg = new_sock.recv(4096)
            if len(msg) > 0:
                response += msg # Append msg to current response
                if testcrlf(msg, pattern): # Test for \r\n\r\n
                    break 
            else:
                break

        # Parse the header out of response from the payload
        headerEnd = response.decode().find(pattern) # Get index of header end
        header = response.decode()[0:headerEnd] # Copy header into a var

        # Parse out just the request type (ex: GET /file.txt HTTP/1.1)
        splitHeader = header.split("\r\n")[0]
        filename = splitHeader.split(" ")[1].split("/")[-1]

        filetype = filename.split(".")[-1]
        giveRoot = parseCT(filetype)
        # Create the header and attatch our served response for the client
        # showme = os.listdir('../')
        # print(type(showme), showme)
        if giveRoot[1] == False:
            respond = create_header(filename,giveRoot)
        else:
            respond = create_header('index.html',giveRoot)
        # Encode response
        encoding = respond.encode("ISO-8859-1")
        # Send response
        ret = new_sock.sendall(encoding)
        # close accepted socket
        new_sock.close()

