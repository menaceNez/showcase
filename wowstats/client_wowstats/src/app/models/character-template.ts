import {Gearpiece} from './gearpiece';

export interface CharacterTemplate {
  head?: Gearpiece;
  neck?: Gearpiece;
  back?: Gearpiece;
  shoulders?: Gearpiece;
  chest?: Gearpiece;
  waist?: Gearpiece;
  legs?: Gearpiece;
  feet?: Gearpiece;
  hands?: Gearpiece;
  wrist?: Gearpiece;
  onehand?: Gearpiece;// same div
  offhand?: Gearpiece; // for shields
  trinket?: Gearpiece;
  finger?: Gearpiece;
}