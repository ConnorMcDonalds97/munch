import numpy as np
import random as rand
import math

Nu = 0.1
Nr = 0.01

def score(person, restaurant):
    return np.dot(person, restaurant)

def sigmoid(score):
    return 1/(1+(math.e)**(-score))

def normalize(array):
    return array/np.linalg.norm(array)

def gradientDescent(selection, person, restaurant):
    #error = sigmoid(score(person, restaurant)) - selection
    error = score(person, restaurant) - selection
    old_person = np.copy(person)

    person = person - Nu * error * restaurant
    restaurant = restaurant - Nr* error * old_person
    
    person = normalize(person)
    restaurant = normalize(restaurant)
    return person, restaurant


def init(length):
    array = np.zeros(length)
    for i in range(length):
        array[i] = rand.random()
    return normalize(array)

def create_user(users, selections, rest_num):
    selection = np.zeros(rest_num)
    for i in range(rest_num):
        r = rand.randint(0,2)
        if (r == 1):
            selection[i] = 0.5
        elif (r == 2):
            selection[i] = 1

    dot_product = selections @ selection
    top_indice = np.argsort(dot_product)[-1:][::-1]
    


    return np.vstack([users, np.copy(users[top_indice[0]])]), np.vstack([selections, selection])

def main():
    
    vector_size = 64
    rest_num = 30
    user_counter = 1
    user_cap = 100
    counter = np.zeros(rest_num)
    
    rest = []
    users = []
    for _ in range(user_counter):
        users.append(init(vector_size))
    for _ in range(rest_num):
        rest.append(init(vector_size))

    rest = np.array(rest)
    users = np.array(users)

    s = []
    for _ in range(rest_num):
        s.append(0.5)
    s[0] = 1
    user_selection = [
        np.array(s),
    ]
    user_selection = np.array(user_selection)


    simulation = 10
    while (user_counter < user_cap):
        users, user_selection = create_user(users, user_selection, rest_num)
        user_counter += 1
        for _ in range(simulation):
            for i in range(user_counter):
                if (user_selection[i][0] == 1):
                    counter  += user_selection[i]
                for j in range(rest_num):
                    if (user_selection[i][j] != 0.5):
                        users[i], rest[j] = gradientDescent(user_selection[i][j], users[i], rest[j])

    #getting best match
    
    #for sel in user_selection:
    #    print(sel)
    for i in range(len(counter)):
        print(i, ".", counter[i])
    
    dot_products = rest @ users[0]
    top_n = 10
    top_indices = np.argsort(dot_products)[-top_n:][::-1]
    counter.sort()
    print("Top N indices:", top_indices)
    print("MAX: ", counter[-2], counter[-3], counter[-4])
    print("\n\n") 
    print("Similiarity scores", dot_products[top_indices])


if __name__ == "__main__":
    main()