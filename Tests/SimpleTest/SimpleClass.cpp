//This #include won't have any effect, for the file is already included
#include "SimpleClass.h"

std::string SimpleClass::helloWorld = "Hello World";

char* SimpleClass::_getHelloWorld()
{
	return (char*)helloWorld.c_str();
}
