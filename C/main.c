#include<stdio.h>

void getName(char *name) {
    printf("Tell me your name: ");
    scanf("%s", name);
}

int main(int argc, char **argv){
    char name[50];
    getName(name);
    printf("Received the name: %s.", name);
    return 0;
}