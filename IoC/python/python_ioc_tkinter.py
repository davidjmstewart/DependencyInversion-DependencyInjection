# Run with python ./python_ioc_tkinter.py

from tkinter import *

window = Tk()
window.title("IoC example")
window.geometry('600x300')

first_name_label = Label(window, text="First name")
first_name_label.grid(column=0, row=0)
first_name_txt = Entry(window,width=10)
first_name_txt.grid(column=1, row=0)

# Lambda callback allows the framework to call our code when a click event happens
# This is the Hollywood principle in action!
btn = Button(window, text="Submit first name", command=lambda: first_name_label.configure(text = first_name_txt.get())) 
btn.grid(column=2, row=0)

last_name_label = Label(window, text="Last name")
last_name_label.grid(column=0, row=1)
last_name_txt = Entry(window,width=10)
last_name_txt.grid(column=1, row=1)
btn = Button(window, text="Submit last name", command=lambda: last_name_label.configure(text = last_name_txt.get()))
btn.grid(column=2, row=1)

email_label = Label(window, text="Email address")
email_label.grid(column=0, row=2)
email_txt = Entry(window,width=10)
email_txt.grid(column=1, row=2)
btn = Button(window, text="Submit email address", command=lambda: email_label.configure(text = email_txt.get()))
btn.grid(column=2, row=2)

window.mainloop()