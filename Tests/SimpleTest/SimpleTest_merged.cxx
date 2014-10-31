//This file was created with Single-C-File
//Single-C-File was developed by Adrian Dawid.
#ifndef SIMPLE_CLASS_INCLUDED
#define SIMPLE_CLASS_INCLUDED
#include<string>
class SimpleClass{
public:
	static std::string helloWorld;
	static char* _getHelloWorld();
};
#endif
#include<stdio.h>
int main()
{
	printf(SimpleClass::_getHelloWorld());
	printf("\n");
}
std::string SimpleClass::helloWorld = "Hello World";
char* SimpleClass::_getHelloWorld()
{
	return (char*)helloWorld.c_str();
}
