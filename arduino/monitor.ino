#include "EmonLib.h"
#include <SPI.h>
EnergyMonitor emon1;

//Tensao da rede monitorada
int rede = 220;

//Pino do sensor de corrente
int pino_sct = A1;

void setup() 
{
  
Serial.begin(9600);
  //Pino, calibracao - Cur Const= Ratio/BurdenR. 2000/33 = 60 / DEVERIA SER 60, MAS EU AJUSTEI PARA 6, PARA AJUSTAR A CORRENTE E POTENCIAS EXIBIDAS (TAVA DANDO 6w DEVERIA SER 60w)
  emon1.current(pino_sct, 0.6);

}

void loop() {
  
//Calcula a corrente

  double Irms = emon1.calcIrms(1480);
  Serial.print(Irms);
  Serial.print(Irms*rede);   

}