import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdoptionSearchFormData } from 'src/app/core/domain/interfaces/AdoptionSearchFormData';
import { GodfatherAdoptionResultDataTable } from 'src/app/core/domain/interfaces/GodfatherAdoptionResultDataTable';
import { GodfatherSearchFormData } from 'src/app/core/domain/interfaces/GodfatherSearchFormData';
import { CensusDetailedData, Adoption } from 'src/app/modules/detail/domain/CensusDetailedData';
import { BDCLocation } from 'src/app/core/domain/models/BDCLocation';
import { CensusAddress } from 'src/app/core/domain/models/CensusAddress';
import { Consent } from 'src/app/core/domain/models/Consent';
import { Godfather } from 'src/app/core/domain/models/Godfather';
import { Representative } from 'src/app/core/domain/models/Representative';
import { Tree } from 'src/app/core/domain/models/Tree';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public censusData: CensusDetailedData;
  public godfather: Godfather;
  public representative: Representative;
  public consent: Consent;
  public adoption: Adoption;
  public tree: Tree;
  public censusAddress: CensusAddress;
  public bdcLocation: BDCLocation;

  public godfatherAdoptionResultTableData: GodfatherAdoptionResultDataTable;
  public godfatherSearchFormData: GodfatherSearchFormData;
  public adoptionSearchFormData: AdoptionSearchFormData;
  public filterGodfatherBack: FormGroup;
  public filterAdoptionBack: FormGroup;
  public back: boolean;
  public goToTreeOption: string;

  constructor(private fb: FormBuilder) {

    this.back = false;
    this.goToTreeOption = "";

    this.filterGodfatherBack = this.fb.group({
      codigoPadrino: [null],
      nombre: [null],
      apellido1: [null],
      apellido2: [null],
      genero: [null],
      fechaNacimientoFin: [null],
      fechaNacimientoInicio: [null],
      distritoPadrino: [null],
      barrioPadrino: [null]
    });

    this.filterAdoptionBack = this.fb.group({
      codigoAdopcion: [null],
      arbol: [null],
      especie: [null],
      fechaAdopcionDesde: [null],
      fechaAdopcionHasta: [null],
      distritoAdopcion: [null],
      barrioAdopcion: [null]
    });

    this.godfatherAdoptionResultTableData =
    {
      treeName: '',
      adoptionNeigh: 0,
      adoptionDistrict: 0,
      godfatherBirthday: '',
      treeSpecies: '',
      godfatherGender: '',
      adoptionId: 0,
      adoptionDate: '',
      godfatherName: ''
    };

    this.godfatherSearchFormData =
    {
      id: '',
      name: '',
      lastName1: '',
      lastName2: '',
      birthdayFrom: '',
      birthdayTo: '',
      gender: '',
      district: '',
      neighborhood: ''
    };

    this.adoptionSearchFormData =
    {
      id: '',
      treeName: '',
      treeSpecies: '',
      dateFrom: '',
      dateTo: '',
      district: '',
      neighborhood: ''
    };

    this.censusData =
    {
      godfather: {
        id: 0,
        name: '',
        lastName1: '',
        lastName2: '',
        gender: '',
        birthday: ''
      },

      representative: {
        id: 0,
        name: '',
        lastName1: '',
        lastName2: '',
        birthday: '',
        nifNie: ''
      },

      consent: {
        id: 0,
        censusConsent: false,
        censusConsentDate: '',
        adultAuthorization: false,
        adultAuthorizationConsentDate: '',
        guardian: false,
        guardianConsentDate: '',
        visibleOthers: false,
        visibleOthersConsentDate: '',
        comment: '',
        representativeId: 0
      },

      adoption: {
        id: 0,
        adoptionDate: ''
      },

      tree: {
        id: 0,
        treePositionId: 0,
        xcoord: 0,
        ycoord: 0,
        commonName: '',
        species: '',
        godfatherDistance: 0
      },

      censusAddress: {
        streetType: '',
        streetName: '',
        streetNumber: '',
        staircase: '',
        floor: '',
        door: '',
        zipCode: ''
      },

      bdcLocation: {
        streetType: '',
        streetName: '',
        streetNumber: '',
        staircase: '',
        floor: '',
        door: '',
        zipCode: '',
        ndpClass: '',
        ndp: '',
        xcoord: 0,
        ycoord: 0,
        district: '',
        neigh: ''
      }
    };
  }
}
