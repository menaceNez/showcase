import sys
import socket

def testcrlf(response, pattern):
    resp = bytes(response)
    str = resp.decode()
    strlen = len(str)
    index = -1
    while True:
        index = str.find(pattern, 0)
        if index:
            return True
        else:
            return False

if __name__ == "__main__":
    sock = socket.socket( # Create a socket for ipv4 and tcp
        socket.AF_INET,
        socket.SOCK_STREAM
    )

    if len(sys.argv) < 3: # check if we have a url input
        print("Usage: python3 webclient.py <url> <port>")

    host = sys.argv[1] # take user input
    port = int(sys.argv[2]) # Assign port from userin

    out = sock.connect((host, port)) # Connect to host on port 80 (webserver)

    httprequest = f"GET ../index.html HTTP/1.1\r\nHOST: {host}\r\nConnection: close\r\n\r\n" # Craft a http header

    sock.sendall(httprequest.encode("ISO-8859-1")) # Send httprequest encoded in internet

    response = b''

    while True: # receive while message > 0
        msg = sock.recv(4096) # RECV a message from user
        if len(msg) > 0: # add to response as long as msg > 0
            response += msg
        else: # len(msg) <= 0
            break

    print(response.decode()) # Decode and print message

    sock.close() # Close socket
