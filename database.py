import sqlite3


#Connect to the database
#conn = sqlite3.connect('bitBoard.db')

#Create cursor
#c = conn.cursor()

#color = "#000000"
#xPos = 0
#yPos = 0
#entry = ()

#Create the table
#c.execute("""CREATE TABLE pixels (
#    xPos integer,
#    yPos integer,
#    color text
#)""")

#for xPos in range(100):
#    for yPos in range(100):
#        entry = (xPos, yPos, color)
#        c.execute("INSERT INTO pixels VALUES (?,?,?)", entry)
#    yPos = 0

def grabPixel(i):
    #Connect to the database
    conn = sqlite3.connect('bitBoard.db')

    #Create cursor
    c = conn.cursor()
    
    #Query db
    c.execute("SELECT * FROM pixels")
#print(c.fetchone())
#print(c.fetchone())
#print(c.fetchone())
#c.fetchmany()
    # print(c.fetchall()[i][2])
    return c.fetchall()[i][2]
#delete the db
#c.execute("DELETE FROM pixels")


#Connect to the database
#conn = sqlite3.connect('bitBoard.db')

#Create cursor
#c = conn.cursor()

#Query db
#c.execute("SELECT * FROM pixels")
#print(c.fetchone())
#print(c.fetchone())
#print(c.fetchone())
#c.fetchmany()
#print(c.fetchall()[0][2])
#return(c.fetchall()[i][2])
#delete the db
#c.execute("DELETE FROM pixels")

#Commit the db
#conn.commit()

#Close the connection
#conn.close()

if __name__ == "__main__":
    i = 0
    pixel = grabPixel(i)
    print(pixel)