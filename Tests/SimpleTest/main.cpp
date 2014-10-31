//This is the main file of this test.
//It is the first one in single-c-file project definition file,
//so it is the starting point.

//This #include will disappear...
#include "SimpleClass.h"
//..., and this will stay.
#include<stdio.h>

int main()
{
	printf(SimpleClass::_getHelloWorld());
	printf("\n");
}
