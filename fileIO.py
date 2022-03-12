import os.path, os

def createBoard(board, rows, cols):
    with open('BitBoard.txt', 'w') as f:
        for i in range(rows):
            for j in range(cols):
                f.write(board[i][j])
                f.write(',')
            f.write('\n')
    f.close()

def loadBoard(rows, cols):
    board = []
    
    with open('BitBoard.txt', 'r') as f:
        for i in f:
            i = i.split(',')
            board.append(i)

        for j in range(rows):
            board[j][len(board[j])-1].strip('\n')
    f.close()

    return board