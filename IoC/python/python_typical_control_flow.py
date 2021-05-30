# A procedural python program. Run with python ./python_typical_control_flow.py

def save_details(first, last, email):
    print('Saving user {0}{1}: {2}'.format(last, first, email)) 

def welcome_email(email):
    print('Sending an email to {0}'.format(email)) 

# control flow starts here
first = input("First name: ")
last = input("Last name: ")
email = input("Email address: ")

save_details(first, last, email)
welcome_email(email)