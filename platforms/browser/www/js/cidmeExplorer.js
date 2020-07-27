'use strict'

// eslint globals for CIDME
/* global Cidme, Ajv, UUID */
// eslint globals for RDFLib
/* global $rdf */
// eslint globals for JSON-LD
/* global jsonld */
// eslint globals for N3
/* global N3 */
// eslint globals for JS
/* global alert */
// eslint globals for JQuery
/* global $ */
// eslint globals for Cordova
/* global cordova, device */
// eslint globals for ???
/* global FileReader, FileError, Blob */

// let cidme = new Cidme(new Ajv({ schemaId: 'auto' }), UUID, false)
let cidme = new Cidme(new Ajv({ schemaId: 'auto' }), UUID, jsonld)
let currentEntity = ''

// $('#ce_createEntity').on('touchend', function () { ceAction('createEntity') })
// $('#ce_createEntity').on('click', function () {
$(document).on('click', '#ce_createEntity', function () {
  ceAction('createEntity')
})

// $('#ce_viewEntity').on('touchend', function () { ceAction('viewEntity') })
// $('#ce_viewEntity').on('click', function () {
$(document).on('click', '#ce_viewEntity', function () {
  ceAction('viewEntity')
})

// $('#ce_downloadEntity').on('touchend', function () { ceAction('downloadEntity') })
// $('#ce_downloadEntity').on('click', function () {
$(document).on('click', '#ce_downloadEntity', function () {
  ceAction('downloadEntity')
})

// $('#ce_readFile').on('touchend', function () { ceReadFile('example.json') })
// $('#ce_readFile').on('click', function () {
$(document).on('click', '#ce_readFile', function () {
  //alert($('#ce_fileName').val())
  ceReadFile($('#ce_fileName').val())
})

// $('#ce_writeFile').on('touchend', function () { ceWriteFile('example.json') })
// $('#ce_writeFile').on('click', function () {
$(document).on('click', '#ce_writeFile', function () {
  ceWriteFile($('#ce_fileName').val())
})

$(document).on('click', '#ce_jsonHide', function () {
  $('#ce_entityData').hide()
  $('#ce_jsonHide').hide()
  $('#ce_jsonShow').show()
})

$(document).on('click', '#ce_jsonShow', function () {
  $('#ce_entityData').show()
  $('#ce_jsonShow').hide()
  $('#ce_jsonHide').show()
})

// /*
let cachedJsonLdContexts = {
  'http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json': {
    '@context': {
      'type': '@type',
      'id': '@id',
      '@vocab': 'http://cidme.net/vocab/ext/0.1.0/',
      'cidmeext': 'http://cidme.net/vocab/ext/0.1.0/',
      'ActiveStatus': { '@id': 'cidmeext:ActiveStatus/ActiveStatus.jsonld' },
      'ActiveSuperStatus': { '@id': 'cidmeext:ActiveSuperStatus/ActiveSuperStatus.jsonld' },
      'ArchivedStatus': { '@id': 'cidmeext:ArchivedStatus/ArchivedStatus.jsonld' },
      'ArchivedSuperStatus': { '@id': 'cidmeext:ArchivedSuperStatus/ArchivedSuperStatus.jsonld' },
      'CanceledStatus': { '@id': 'cidmeext:CanceledStatus/CanceledStatus.jsonld' },
      'ConceptionStatus': { '@id': 'cidmeext:ConceptionStatus/ConceptionStatus.jsonld' },
      'DefaultMetadata': { '@id': 'cidmeext:DefaultMetadata/DefaultMetadata.jsonld' },
      'EntityType': { '@id': 'cidmeext:EntityType/EntityType.jsonld' },
      'EntityTypeMetadata': { '@id': 'cidmeext:EntityTypeMetadata/EntityTypeMetadata.jsonld' }, 
      'InactiveStatus': { '@id': 'cidmeext:InactiveStatus/InactiveStatus.jsonld' },
      'InactiveSuperStatus': { '@id': 'cidmeext:InactiveSuperStatus/InactiveSuperStatus.jsonld' },
      'OrganizationEntityType': { '@id': 'cidmeext:OrganizationEntityType/OrganizationEntityType.jsonld' },
      'PersonEntityType': { '@id': 'cidmeext:PersonEntityType/PersonEntityType.jsonld' },
      'PersonNameEntityContextData': { '@id': 'cidmeext:PersonNameEntityContextData/PersonNameEntityContextData.jsonld' },
      'PlaceEntityType': { '@id': 'cidmeext:PlaceEntityType/PlaceEntityType.jsonld' },
      'PurgedStatus': { '@id': 'cidmeext:PurgedStatus/PurgedStatus.jsonld' },
      'ResourceStatus': { '@id': 'cidmeext:ResourceStatus/ResourceStatus.jsonld' },
      'ResourceSuperStatus': { '@id': 'cidmeext:ResourceSuperStatus/ResourceSuperStatus.jsonld' },
      'StagingStatus': { '@id': 'cidmeext:StagingStatus/StagingStatus.jsonld' },
      'StagingSuperStatus': { '@id': 'cidmeext:StagingSuperStatus/StagingSuperStatus.jsonld' },
      'StatusMetadata': { '@id': 'cidmeext:StatusMetadata/StatusMetadata.jsonld' },
      'ThingEntityType': { '@id': 'cidmeext:ThingEntityType/ThingEntityType.jsonld' },
      'TypeMetadata': { '@id': 'cidmeext:TypeMetadata/TypeMetadata.jsonld' },
      'default': { '@id': 'cidmeext:default/default.jsonld' },
      'displayName': { '@id': 'cidmeext:displayName/displayName.jsonld' },
      'endDateTime': { '@id': 'cidmeext:endDateTime/endDateTime.jsonld' },
      'entityType': { '@id': 'cidmeext:entityType/entityType.jsonld' },
      'familyName': { '@id': 'cidmeext:familyName/familyName.jsonld' },
      'generationQualifier': { '@id': 'cidmeext:generationQualifier/generationQualifier.jsonld' },
      'givenInformalName': { '@id': 'cidmeext:givenInformalName/givenInformalName.jsonld' },
      'givenName': { '@id': 'cidmeext:givenName/givenName.jsonld' },
      'indexName': { '@id': 'cidmeext:indexName/indexName.jsonld' },
      'middleName': { '@id': 'cidmeext:middleName/middleName.jsonld' },
      'nickName': { '@id': 'cidmeext:nickName/nickName.jsonld' },
      'prefixName': { '@id': 'cidmeext:prefixName/prefixName.jsonld' },
      'resourceStatus': { '@id': 'cidmeext:resourceStatus/resourceStatus.jsonld' },
      'resourceSuperStatus': { '@id': 'cidmeext:resourceSuperStatus/resourceSuperStatus.jsonld' },
      'startDateTime': { '@id': 'cidmeext:startDateTime/startDateTime.jsonld' },
      'suffixName': { '@id': 'cidmeext:suffixName/suffixName.jsonld' }
    }
  },
  'http://cidme.net/vocab/core/0.3.0/jsonldcontext.json': {
    '@context': {
      'type': '@type',
      'id': '@id',
      '@vocab': 'http://cidme.net/vocab/core/0.3.0/',
      'cidme': 'http://cidme.net/vocab/core/0.3.0/',
      'cidmeUri': { '@id': 'cidme:cidmeUri/cidmeUri.jsonld' },
      'data': { '@id': 'cidme:data/data.jsonld' },
      'Entity': { '@id': 'cidme:Entity/Entity.jsonld' },
      'entityContexts': { '@id': 'cidme:entityContexts/entityContexts.jsonld' },
      'EntityContext': { '@id': 'cidme:EntityContext/EntityContext.jsonld' },
      'entityContextData': { '@id': 'cidme:entityContextData/entityContextData.jsonld' },
      'EntityContextDataGroup': { '@id': 'cidme:EntityContextDataGroup/EntityContextDataGroup.jsonld' },
      'entityContextLinks': { '@id': 'cidme:entityContextLinks/entityContextLinks.jsonld' },
      'EntityContextLinkGroup': { '@id': 'cidme:EntityContextLinkGroup/EntityContextLinkGroup.jsonld' },
      'externalId': { '@id': 'cidme:externalId/externalId.jsonld' },
      'externalIdType': { '@id': 'cidme:externalIdType/externalIdType.jsonld' },
      'CreatedMetadata': { '@id': 'cidme:CreatedMetadata/CreatedMetadata.jsonld' },
      'ModifiedMetadata': { '@id': 'cidme:ModifiedMetadata/ModifiedMetadata.jsonld' },
      'LastModifiedMetadata': { '@id': 'cidme:LastModifiedMetadata/LastModifiedMetadata.jsonld' },
      'LabelMetadata': { '@id': 'cidme:LabelMetadata/LabelMetadata.jsonld' },
      'NoteMetadata': { '@id': 'cidme:NoteMetadata/NoteMetadata.jsonld' },
      'metadata': { '@id': 'cidme:metadata/metadata.jsonld' },
      'MetadataGroup': { '@id': 'cidme:MetadataGroup/MetadataGroup.jsonld' }
    }
  },
  'http://cidme.net/vocab/core/0.4.0/jsonldcontext.json': {
      '@context': {
        'type': '@type',
        'id': '@id',
        '@vocab': 'http://cidme.net/vocab/core/0.4.0/',
        'cidme': 'http://cidme.net/vocab/core/0.4.0/',
        'cidmeUri': {'@id': 'cidme:cidmeUri/cidmeUri.jsonld'},
        'data': {'@id': 'cidme:data/data.jsonld'},
        'groupDataType': {'@id': 'cidme:groupDataType/groupDataType.jsonld'},
        'Entity': {'@id': 'cidme:Entity/Entity.jsonld'},
        'entityContexts': {'@id': 'cidme:entityContexts/entityContexts.jsonld'},
        'EntityContext': {'@id': 'cidme:EntityContext/EntityContext.jsonld'},
        'entityContextData': {'@id': 'cidme:entityContextData/entityContextData.jsonld'},
        'EntityContextDataGroup': {'@id': 'cidme:EntityContextDataGroup/EntityContextDataGroup.jsonld'},
        'entityContextLinks': {'@id': 'cidme:entityContextLinks/entityContextLinks.jsonld'},
        'EntityContextLinkGroup': {'@id': 'cidme:EntityContextLinkGroup/EntityContextLinkGroup.jsonld'},
        'externalId': {'@id': 'cidme:externalId/externalId.jsonld'},
        'externalIdType': {'@id': 'cidme:externalIdType/externalIdType.jsonld'},
        'CreatedMetadata': {'@id': 'cidme:CreatedMetadata/CreatedMetadata.jsonld'},
        'ModifiedMetadata': {'@id': 'cidme:ModifiedMetadata/ModifiedMetadata.jsonld'},
        'LastModifiedMetadata': {'@id': 'cidme:LastModifiedMetadata/LastModifiedMetadata.jsonld'},
        'ImageMetadata': {'@id': 'cidme:LabelMetadata/ImageMetadata.jsonld'},
        'LabelMetadata': {'@id': 'cidme:LabelMetadata/LabelMetadata.jsonld'},
        'NoteMetadata': {'@id': 'cidme:NoteMetadata/NoteMetadata.jsonld'},    
        'metadata': {'@id': 'cidme:metadata/metadata.jsonld'},
        'MetadataGroup': {'@id': 'cidme:MetadataGroup/MetadataGroup.jsonld'}
    }
  },
  'http://schema.org': {
  "@context": {
        "type": "@type",
        "id": "@id",
        "HTML": { "@id": "rdf:HTML" },

        "@vocab": "http://schema.org/",
        "xml": "http://www.w3.org/XML/1998/namespace",
        "foaf": "http://xmlns.com/foaf/0.1/",
        "eli": "http://data.europa.eu/eli/ontology#",
        "snomed": "http://purl.bioontology.org/ontology/SNOMEDCT/",
        "bibo": "http://purl.org/ontology/bibo/",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "void": "http://rdfs.org/ns/void#",
        "dc": "http://purl.org/dc/elements/1.1/",
        "dctype": "http://purl.org/dc/dcmitype/",
        "schema": "http://schema.org/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "dcat": "http://www.w3.org/ns/dcat#",
        "rdfa": "http://www.w3.org/ns/rdfa#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "dct": "http://purl.org/dc/terms/",
        "dcterms": "http://purl.org/dc/terms/",
        "owl": "http://www.w3.org/2002/07/owl#",
        "3DModel": {"@id": "schema:3DModel"},
        "AMRadioChannel": {"@id": "schema:AMRadioChannel"},
        "APIReference": {"@id": "schema:APIReference"},
        "Abdomen": {"@id": "schema:Abdomen"},
        "AboutPage": {"@id": "schema:AboutPage"},
        "AcceptAction": {"@id": "schema:AcceptAction"},
        "Accommodation": {"@id": "schema:Accommodation"},
        "AccountingService": {"@id": "schema:AccountingService"},
        "AchieveAction": {"@id": "schema:AchieveAction"},
        "Action": {"@id": "schema:Action"},
        "ActionAccessSpecification": {"@id": "schema:ActionAccessSpecification"},
        "ActionStatusType": {"@id": "schema:ActionStatusType"},
        "ActivateAction": {"@id": "schema:ActivateAction"},
        "ActiveActionStatus": {"@id": "schema:ActiveActionStatus"},
        "ActiveNotRecruiting": {"@id": "schema:ActiveNotRecruiting"},
        "AddAction": {"@id": "schema:AddAction"},
        "AdministrativeArea": {"@id": "schema:AdministrativeArea"},
        "AdultEntertainment": {"@id": "schema:AdultEntertainment"},
        "AdvertiserContentArticle": {"@id": "schema:AdvertiserContentArticle"},
        "AerobicActivity": {"@id": "schema:AerobicActivity"},
        "AggregateOffer": {"@id": "schema:AggregateOffer"},
        "AggregateRating": {"@id": "schema:AggregateRating"},
        "AgreeAction": {"@id": "schema:AgreeAction"},
        "Airline": {"@id": "schema:Airline"},
        "Airport": {"@id": "schema:Airport"},
        "AlbumRelease": {"@id": "schema:AlbumRelease"},
        "AlignmentObject": {"@id": "schema:AlignmentObject"},
        "AllWheelDriveConfiguration": {"@id": "schema:AllWheelDriveConfiguration"},
        "AllocateAction": {"@id": "schema:AllocateAction"},
        "AmusementPark": {"@id": "schema:AmusementPark"},
        "AnaerobicActivity": {"@id": "schema:AnaerobicActivity"},
        "AnalysisNewsArticle": {"@id": "schema:AnalysisNewsArticle"},
        "AnatomicalStructure": {"@id": "schema:AnatomicalStructure"},
        "AnatomicalSystem": {"@id": "schema:AnatomicalSystem"},
        "Anesthesia": {"@id": "schema:Anesthesia"},
        "AnimalShelter": {"@id": "schema:AnimalShelter"},
        "Answer": {"@id": "schema:Answer"},
        "Apartment": {"@id": "schema:Apartment"},
        "ApartmentComplex": {"@id": "schema:ApartmentComplex"},
        "Appearance": {"@id": "schema:Appearance"},
        "AppendAction": {"@id": "schema:AppendAction"},
        "ApplyAction": {"@id": "schema:ApplyAction"},
        "ApprovedIndication": {"@id": "schema:ApprovedIndication"},
        "Aquarium": {"@id": "schema:Aquarium"},
        "ArchiveComponent": {"@id": "schema:ArchiveComponent"},
        "ArchiveOrganization": {"@id": "schema:ArchiveOrganization"},
        "ArriveAction": {"@id": "schema:ArriveAction"},
        "ArtGallery": {"@id": "schema:ArtGallery"},
        "Artery": {"@id": "schema:Artery"},
        "Article": {"@id": "schema:Article"},
        "AskAction": {"@id": "schema:AskAction"},
        "AskPublicNewsArticle": {"@id": "schema:AskPublicNewsArticle"},
        "AssessAction": {"@id": "schema:AssessAction"},
        "AssignAction": {"@id": "schema:AssignAction"},
        "Atlas": {"@id": "schema:Atlas"},
        "Attorney": {"@id": "schema:Attorney"},
        "Audience": {"@id": "schema:Audience"},
        "AudioObject": {"@id": "schema:AudioObject"},
        "Audiobook": {"@id": "schema:Audiobook"},
        "AudiobookFormat": {"@id": "schema:AudiobookFormat"},
        "AuthenticContent": {"@id": "schema:AuthenticContent"},
        "AuthoritativeLegalValue": {"@id": "schema:AuthoritativeLegalValue"},
        "AuthorizeAction": {"@id": "schema:AuthorizeAction"},
        "AutoBodyShop": {"@id": "schema:AutoBodyShop"},
        "AutoDealer": {"@id": "schema:AutoDealer"},
        "AutoPartsStore": {"@id": "schema:AutoPartsStore"},
        "AutoRental": {"@id": "schema:AutoRental"},
        "AutoRepair": {"@id": "schema:AutoRepair"},
        "AutoWash": {"@id": "schema:AutoWash"},
        "AutomatedTeller": {"@id": "schema:AutomatedTeller"},
        "AutomotiveBusiness": {"@id": "schema:AutomotiveBusiness"},
        "Ayurvedic": {"@id": "schema:Ayurvedic"},
        "BackgroundNewsArticle": {"@id": "schema:BackgroundNewsArticle"},
        "Bacteria": {"@id": "schema:Bacteria"},
        "Bakery": {"@id": "schema:Bakery"},
        "Balance": {"@id": "schema:Balance"},
        "BankAccount": {"@id": "schema:BankAccount"},
        "BankOrCreditUnion": {"@id": "schema:BankOrCreditUnion"},
        "BarOrPub": {"@id": "schema:BarOrPub"},
        "Barcode": {"@id": "schema:Barcode"},
        "BasicIncome": {"@id": "schema:BasicIncome"},
        "Beach": {"@id": "schema:Beach"},
        "BeautySalon": {"@id": "schema:BeautySalon"},
        "BedAndBreakfast": {"@id": "schema:BedAndBreakfast"},
        "BedDetails": {"@id": "schema:BedDetails"},
        "BedType": {"@id": "schema:BedType"},
        "BefriendAction": {"@id": "schema:BefriendAction"},
        "BenefitsHealthAspect": {"@id": "schema:BenefitsHealthAspect"},
        "BikeStore": {"@id": "schema:BikeStore"},
        "Blog": {"@id": "schema:Blog"},
        "BlogPosting": {"@id": "schema:BlogPosting"},
        "BloodTest": {"@id": "schema:BloodTest"},
        "BoardingPolicyType": {"@id": "schema:BoardingPolicyType"},
        "BodyOfWater": {"@id": "schema:BodyOfWater"},
        "Bone": {"@id": "schema:Bone"},
        "Book": {"@id": "schema:Book"},
        "BookFormatType": {"@id": "schema:BookFormatType"},
        "BookSeries": {"@id": "schema:BookSeries"},
        "BookStore": {"@id": "schema:BookStore"},
        "BookmarkAction": {"@id": "schema:BookmarkAction"},
        "Boolean": {"@id": "schema:Boolean"},
        "BorrowAction": {"@id": "schema:BorrowAction"},
        "BowlingAlley": {"@id": "schema:BowlingAlley"},
        "BrainStructure": {"@id": "schema:BrainStructure"},
        "Brand": {"@id": "schema:Brand"},
        "BreadcrumbList": {"@id": "schema:BreadcrumbList"},
        "Brewery": {"@id": "schema:Brewery"},
        "Bridge": {"@id": "schema:Bridge"},
        "BroadcastChannel": {"@id": "schema:BroadcastChannel"},
        "BroadcastEvent": {"@id": "schema:BroadcastEvent"},
        "BroadcastFrequencySpecification": {"@id": "schema:BroadcastFrequencySpecification"},
        "BroadcastRelease": {"@id": "schema:BroadcastRelease"},
        "BroadcastService": {"@id": "schema:BroadcastService"},
        "BrokerageAccount": {"@id": "schema:BrokerageAccount"},
        "BuddhistTemple": {"@id": "schema:BuddhistTemple"},
        "BusOrCoach": {"@id": "schema:BusOrCoach"},
        "BusReservation": {"@id": "schema:BusReservation"},
        "BusStation": {"@id": "schema:BusStation"},
        "BusStop": {"@id": "schema:BusStop"},
        "BusTrip": {"@id": "schema:BusTrip"},
        "BusinessAudience": {"@id": "schema:BusinessAudience"},
        "BusinessEntityType": {"@id": "schema:BusinessEntityType"},
        "BusinessEvent": {"@id": "schema:BusinessEvent"},
        "BusinessFunction": {"@id": "schema:BusinessFunction"},
        "BusinessSupport": {"@id": "schema:BusinessSupport"},
        "BuyAction": {"@id": "schema:BuyAction"},
        "CDCPMDRecord": {"@id": "schema:CDCPMDRecord"},
        "CDFormat": {"@id": "schema:CDFormat"},
        "CT": {"@id": "schema:CT"},
        "CableOrSatelliteService": {"@id": "schema:CableOrSatelliteService"},
        "CafeOrCoffeeShop": {"@id": "schema:CafeOrCoffeeShop"},
        "Campground": {"@id": "schema:Campground"},
        "CampingPitch": {"@id": "schema:CampingPitch"},
        "Canal": {"@id": "schema:Canal"},
        "CancelAction": {"@id": "schema:CancelAction"},
        "Car": {"@id": "schema:Car"},
        "CarUsageType": {"@id": "schema:CarUsageType"},
        "Cardiovascular": {"@id": "schema:Cardiovascular"},
        "CardiovascularExam": {"@id": "schema:CardiovascularExam"},
        "CaseSeries": {"@id": "schema:CaseSeries"},
        "Casino": {"@id": "schema:Casino"},
        "CassetteFormat": {"@id": "schema:CassetteFormat"},
        "CategoryCode": {"@id": "schema:CategoryCode"},
        "CategoryCodeSet": {"@id": "schema:CategoryCodeSet"},
        "CatholicChurch": {"@id": "schema:CatholicChurch"},
        "CausesHealthAspect": {"@id": "schema:CausesHealthAspect"},
        "Cemetery": {"@id": "schema:Cemetery"},
        "Chapter": {"@id": "schema:Chapter"},
        "CharitableIncorporatedOrganization": {"@id": "schema:CharitableIncorporatedOrganization"},
        "CheckAction": {"@id": "schema:CheckAction"},
        "CheckInAction": {"@id": "schema:CheckInAction"},
        "CheckOutAction": {"@id": "schema:CheckOutAction"},
        "CheckoutPage": {"@id": "schema:CheckoutPage"},
        "ChildCare": {"@id": "schema:ChildCare"},
        "ChildrensEvent": {"@id": "schema:ChildrensEvent"},
        "Chiropractic": {"@id": "schema:Chiropractic"},
        "ChooseAction": {"@id": "schema:ChooseAction"},
        "Church": {"@id": "schema:Church"},
        "City": {"@id": "schema:City"},
        "CityHall": {"@id": "schema:CityHall"},
        "CivicStructure": {"@id": "schema:CivicStructure"},
        "Claim": {"@id": "schema:Claim"},
        "ClaimReview": {"@id": "schema:ClaimReview"},
        "Class": {"@id": "schema:Class"},
        "Clinician": {"@id": "schema:Clinician"},
        "Clip": {"@id": "schema:Clip"},
        "ClothingStore": {"@id": "schema:ClothingStore"},
        "CoOp": {"@id": "schema:CoOp"},
        "Code": {"@id": "schema:Code"},
        "CohortStudy": {"@id": "schema:CohortStudy"},
        "Collection": {"@id": "schema:Collection"},
        "CollectionPage": {"@id": "schema:CollectionPage"},
        "CollegeOrUniversity": {"@id": "schema:CollegeOrUniversity"},
        "ComedyClub": {"@id": "schema:ComedyClub"},
        "ComedyEvent": {"@id": "schema:ComedyEvent"},
        "ComicCoverArt": {"@id": "schema:ComicCoverArt"},
        "ComicIssue": {"@id": "schema:ComicIssue"},
        "ComicSeries": {"@id": "schema:ComicSeries"},
        "ComicStory": {"@id": "schema:ComicStory"},
        "Comment": {"@id": "schema:Comment"},
        "CommentAction": {"@id": "schema:CommentAction"},
        "CommentPermission": {"@id": "schema:CommentPermission"},
        "CommunicateAction": {"@id": "schema:CommunicateAction"},
        "CommunityHealth": {"@id": "schema:CommunityHealth"},
        "CompilationAlbum": {"@id": "schema:CompilationAlbum"},
        "CompleteDataFeed": {"@id": "schema:CompleteDataFeed"},
        "Completed": {"@id": "schema:Completed"},
        "CompletedActionStatus": {"@id": "schema:CompletedActionStatus"},
        "CompoundPriceSpecification": {"@id": "schema:CompoundPriceSpecification"},
        "ComputerLanguage": {"@id": "schema:ComputerLanguage"},
        "ComputerStore": {"@id": "schema:ComputerStore"},
        "ConfirmAction": {"@id": "schema:ConfirmAction"},
        "Consortium": {"@id": "schema:Consortium"},
        "ConsumeAction": {"@id": "schema:ConsumeAction"},
        "ContactPage": {"@id": "schema:ContactPage"},
        "ContactPoint": {"@id": "schema:ContactPoint"},
        "ContactPointOption": {"@id": "schema:ContactPointOption"},
        "ContagiousnessHealthAspect": {"@id": "schema:ContagiousnessHealthAspect"},
        "Continent": {"@id": "schema:Continent"},
        "ControlAction": {"@id": "schema:ControlAction"},
        "ConvenienceStore": {"@id": "schema:ConvenienceStore"},
        "Conversation": {"@id": "schema:Conversation"},
        "CookAction": {"@id": "schema:CookAction"},
        "Corporation": {"@id": "schema:Corporation"},
        "CorrectionComment": {"@id": "schema:CorrectionComment"},
        "Country": {"@id": "schema:Country"},
        "Course": {"@id": "schema:Course"},
        "CourseInstance": {"@id": "schema:CourseInstance"},
        "Courthouse": {"@id": "schema:Courthouse"},
        "CoverArt": {"@id": "schema:CoverArt"},
        "CovidTestingFacility": {"@id": "schema:CovidTestingFacility"},
        "CreateAction": {"@id": "schema:CreateAction"},
        "CreativeWork": {"@id": "schema:CreativeWork"},
        "CreativeWorkSeason": {"@id": "schema:CreativeWorkSeason"},
        "CreativeWorkSeries": {"@id": "schema:CreativeWorkSeries"},
        "CreditCard": {"@id": "schema:CreditCard"},
        "Crematorium": {"@id": "schema:Crematorium"},
        "CriticReview": {"@id": "schema:CriticReview"},
        "CrossSectional": {"@id": "schema:CrossSectional"},
        "CssSelectorType": {"@id": "schema:CssSelectorType"},
        "CurrencyConversionService": {"@id": "schema:CurrencyConversionService"},
        "DDxElement": {"@id": "schema:DDxElement"},
        "DJMixAlbum": {"@id": "schema:DJMixAlbum"},
        "DVDFormat": {"@id": "schema:DVDFormat"},
        "DamagedCondition": {"@id": "schema:DamagedCondition"},
        "DanceEvent": {"@id": "schema:DanceEvent"},
        "DanceGroup": {"@id": "schema:DanceGroup"},
        "DataCatalog": {"@id": "schema:DataCatalog"},
        "DataDownload": {"@id": "schema:DataDownload"},
        "DataFeed": {"@id": "schema:DataFeed"},
        "DataFeedItem": {"@id": "schema:DataFeedItem"},
        "DataType": {"@id": "schema:DataType"},
        "Dataset": {"@id": "schema:Dataset"},
        "Date": {"@id": "schema:Date"},
        "DateTime": {"@id": "schema:DateTime"},
        "DatedMoneySpecification": {"@id": "schema:DatedMoneySpecification"},
        "DayOfWeek": {"@id": "schema:DayOfWeek"},
        "DaySpa": {"@id": "schema:DaySpa"},
        "DeactivateAction": {"@id": "schema:DeactivateAction"},
        "DefenceEstablishment": {"@id": "schema:DefenceEstablishment"},
        "DefinedRegion": {"@id": "schema:DefinedRegion"},
        "DefinedTerm": {"@id": "schema:DefinedTerm"},
        "DefinedTermSet": {"@id": "schema:DefinedTermSet"},
        "DefinitiveLegalValue": {"@id": "schema:DefinitiveLegalValue"},
        "DeleteAction": {"@id": "schema:DeleteAction"},
        "DeliveryChargeSpecification": {"@id": "schema:DeliveryChargeSpecification"},
        "DeliveryEvent": {"@id": "schema:DeliveryEvent"},
        "DeliveryMethod": {"@id": "schema:DeliveryMethod"},
        "DeliveryTimeSettings": {"@id": "schema:DeliveryTimeSettings"},
        "Demand": {"@id": "schema:Demand"},
        "DemoAlbum": {"@id": "schema:DemoAlbum"},
        "Dentist": {"@id": "schema:Dentist"},
        "Dentistry": {"@id": "schema:Dentistry"},
        "DepartAction": {"@id": "schema:DepartAction"},
        "DepartmentStore": {"@id": "schema:DepartmentStore"},
        "DepositAccount": {"@id": "schema:DepositAccount"},
        "Dermatologic": {"@id": "schema:Dermatologic"},
        "Dermatology": {"@id": "schema:Dermatology"},
        "DiabeticDiet": {"@id": "schema:DiabeticDiet"},
        "Diagnostic": {"@id": "schema:Diagnostic"},
        "DiagnosticLab": {"@id": "schema:DiagnosticLab"},
        "DiagnosticProcedure": {"@id": "schema:DiagnosticProcedure"},
        "Diet": {"@id": "schema:Diet"},
        "DietNutrition": {"@id": "schema:DietNutrition"},
        "DietarySupplement": {"@id": "schema:DietarySupplement"},
        "DigitalAudioTapeFormat": {"@id": "schema:DigitalAudioTapeFormat"},
        "DigitalDocument": {"@id": "schema:DigitalDocument"},
        "DigitalDocumentPermission": {"@id": "schema:DigitalDocumentPermission"},
        "DigitalDocumentPermissionType": {"@id": "schema:DigitalDocumentPermissionType"},
        "DigitalFormat": {"@id": "schema:DigitalFormat"},
        "DisabilitySupport": {"@id": "schema:DisabilitySupport"},
        "DisagreeAction": {"@id": "schema:DisagreeAction"},
        "Discontinued": {"@id": "schema:Discontinued"},
        "DiscoverAction": {"@id": "schema:DiscoverAction"},
        "DiscussionForumPosting": {"@id": "schema:DiscussionForumPosting"},
        "DislikeAction": {"@id": "schema:DislikeAction"},
        "Distance": {"@id": "schema:Distance"},
        "Distillery": {"@id": "schema:Distillery"},
        "DonateAction": {"@id": "schema:DonateAction"},
        "DoseSchedule": {"@id": "schema:DoseSchedule"},
        "DoubleBlindedTrial": {"@id": "schema:DoubleBlindedTrial"},
        "DownloadAction": {"@id": "schema:DownloadAction"},
        "DrawAction": {"@id": "schema:DrawAction"},
        "Drawing": {"@id": "schema:Drawing"},
        "DrinkAction": {"@id": "schema:DrinkAction"},
        "DriveWheelConfigurationValue": {"@id": "schema:DriveWheelConfigurationValue"},
        "DrivingSchoolVehicleUsage": {"@id": "schema:DrivingSchoolVehicleUsage"},
        "Drug": {"@id": "schema:Drug"},
        "DrugClass": {"@id": "schema:DrugClass"},
        "DrugCost": {"@id": "schema:DrugCost"},
        "DrugCostCategory": {"@id": "schema:DrugCostCategory"},
        "DrugLegalStatus": {"@id": "schema:DrugLegalStatus"},
        "DrugPregnancyCategory": {"@id": "schema:DrugPregnancyCategory"},
        "DrugPrescriptionStatus": {"@id": "schema:DrugPrescriptionStatus"},
        "DrugStrength": {"@id": "schema:DrugStrength"},
        "DryCleaningOrLaundry": {"@id": "schema:DryCleaningOrLaundry"},
        "Duration": {"@id": "schema:Duration"},
        "EBook": {"@id": "schema:EBook"},
        "EPRelease": {"@id": "schema:EPRelease"},
        "Ear": {"@id": "schema:Ear"},
        "EatAction": {"@id": "schema:EatAction"},
        "EducationEvent": {"@id": "schema:EducationEvent"},
        "EducationalAudience": {"@id": "schema:EducationalAudience"},
        "EducationalOccupationalCredential": {"@id": "schema:EducationalOccupationalCredential"},
        "EducationalOccupationalProgram": {"@id": "schema:EducationalOccupationalProgram"},
        "EducationalOrganization": {"@id": "schema:EducationalOrganization"},
        "Electrician": {"@id": "schema:Electrician"},
        "ElectronicsStore": {"@id": "schema:ElectronicsStore"},
        "ElementarySchool": {"@id": "schema:ElementarySchool"},
        "EmailMessage": {"@id": "schema:EmailMessage"},
        "Embassy": {"@id": "schema:Embassy"},
        "Emergency": {"@id": "schema:Emergency"},
        "EmergencyService": {"@id": "schema:EmergencyService"},
        "EmployeeRole": {"@id": "schema:EmployeeRole"},
        "EmployerAggregateRating": {"@id": "schema:EmployerAggregateRating"},
        "EmployerReview": {"@id": "schema:EmployerReview"},
        "EmploymentAgency": {"@id": "schema:EmploymentAgency"},
        "Endocrine": {"@id": "schema:Endocrine"},
        "EndorseAction": {"@id": "schema:EndorseAction"},
        "EndorsementRating": {"@id": "schema:EndorsementRating"},
        "Energy": {"@id": "schema:Energy"},
        "EngineSpecification": {"@id": "schema:EngineSpecification"},
        "EnrollingByInvitation": {"@id": "schema:EnrollingByInvitation"},
        "EntertainmentBusiness": {"@id": "schema:EntertainmentBusiness"},
        "EntryPoint": {"@id": "schema:EntryPoint"},
        "Enumeration": {"@id": "schema:Enumeration"},
        "Episode": {"@id": "schema:Episode"},
        "Event": {"@id": "schema:Event"},
        "EventAttendanceModeEnumeration": {"@id": "schema:EventAttendanceModeEnumeration"},
        "EventCancelled": {"@id": "schema:EventCancelled"},
        "EventMovedOnline": {"@id": "schema:EventMovedOnline"},
        "EventPostponed": {"@id": "schema:EventPostponed"},
        "EventRescheduled": {"@id": "schema:EventRescheduled"},
        "EventReservation": {"@id": "schema:EventReservation"},
        "EventScheduled": {"@id": "schema:EventScheduled"},
        "EventSeries": {"@id": "schema:EventSeries"},
        "EventStatusType": {"@id": "schema:EventStatusType"},
        "EventVenue": {"@id": "schema:EventVenue"},
        "EvidenceLevelA": {"@id": "schema:EvidenceLevelA"},
        "EvidenceLevelB": {"@id": "schema:EvidenceLevelB"},
        "EvidenceLevelC": {"@id": "schema:EvidenceLevelC"},
        "ExchangeRateSpecification": {"@id": "schema:ExchangeRateSpecification"},
        "ExchangeRefund": {"@id": "schema:ExchangeRefund"},
        "ExerciseAction": {"@id": "schema:ExerciseAction"},
        "ExerciseGym": {"@id": "schema:ExerciseGym"},
        "ExercisePlan": {"@id": "schema:ExercisePlan"},
        "ExhibitionEvent": {"@id": "schema:ExhibitionEvent"},
        "Eye": {"@id": "schema:Eye"},
        "FAQPage": {"@id": "schema:FAQPage"},
        "FDAcategoryA": {"@id": "schema:FDAcategoryA"},
        "FDAcategoryB": {"@id": "schema:FDAcategoryB"},
        "FDAcategoryC": {"@id": "schema:FDAcategoryC"},
        "FDAcategoryD": {"@id": "schema:FDAcategoryD"},
        "FDAcategoryX": {"@id": "schema:FDAcategoryX"},
        "FDAnotEvaluated": {"@id": "schema:FDAnotEvaluated"},
        "FMRadioChannel": {"@id": "schema:FMRadioChannel"},
        "FailedActionStatus": {"@id": "schema:FailedActionStatus"},
        "False": {"@id": "schema:False"},
        "FastFoodRestaurant": {"@id": "schema:FastFoodRestaurant"},
        "Female": {"@id": "schema:Female"},
        "Festival": {"@id": "schema:Festival"},
        "FilmAction": {"@id": "schema:FilmAction"},
        "FinancialProduct": {"@id": "schema:FinancialProduct"},
        "FinancialService": {"@id": "schema:FinancialService"},
        "FindAction": {"@id": "schema:FindAction"},
        "FireStation": {"@id": "schema:FireStation"},
        "Flexibility": {"@id": "schema:Flexibility"},
        "Flight": {"@id": "schema:Flight"},
        "FlightReservation": {"@id": "schema:FlightReservation"},
        "Float": {"@id": "schema:Float"},
        "FloorPlan": {"@id": "schema:FloorPlan"},
        "Florist": {"@id": "schema:Florist"},
        "FollowAction": {"@id": "schema:FollowAction"},
        "FoodEstablishment": {"@id": "schema:FoodEstablishment"},
        "FoodEstablishmentReservation": {"@id": "schema:FoodEstablishmentReservation"},
        "FoodEvent": {"@id": "schema:FoodEvent"},
        "FoodService": {"@id": "schema:FoodService"},
        "FourWheelDriveConfiguration": {"@id": "schema:FourWheelDriveConfiguration"},
        "Friday": {"@id": "schema:Friday"},
        "FrontWheelDriveConfiguration": {"@id": "schema:FrontWheelDriveConfiguration"},
        "FullRefund": {"@id": "schema:FullRefund"},
        "FundingAgency": {"@id": "schema:FundingAgency"},
        "FundingScheme": {"@id": "schema:FundingScheme"},
        "Fungus": {"@id": "schema:Fungus"},
        "FurnitureStore": {"@id": "schema:FurnitureStore"},
        "Game": {"@id": "schema:Game"},
        "GamePlayMode": {"@id": "schema:GamePlayMode"},
        "GameServer": {"@id": "schema:GameServer"},
        "GameServerStatus": {"@id": "schema:GameServerStatus"},
        "GardenStore": {"@id": "schema:GardenStore"},
        "GasStation": {"@id": "schema:GasStation"},
        "Gastroenterologic": {"@id": "schema:Gastroenterologic"},
        "GatedResidenceCommunity": {"@id": "schema:GatedResidenceCommunity"},
        "GenderType": {"@id": "schema:GenderType"},
        "GeneralContractor": {"@id": "schema:GeneralContractor"},
        "Genetic": {"@id": "schema:Genetic"},
        "Genitourinary": {"@id": "schema:Genitourinary"},
        "GeoCircle": {"@id": "schema:GeoCircle"},
        "GeoCoordinates": {"@id": "schema:GeoCoordinates"},
        "GeoShape": {"@id": "schema:GeoShape"},
        "GeospatialGeometry": {"@id": "schema:GeospatialGeometry"},
        "Geriatric": {"@id": "schema:Geriatric"},
        "GiveAction": {"@id": "schema:GiveAction"},
        "GlutenFreeDiet": {"@id": "schema:GlutenFreeDiet"},
        "GolfCourse": {"@id": "schema:GolfCourse"},
        "GovernmentBenefitsType": {"@id": "schema:GovernmentBenefitsType"},
        "GovernmentBuilding": {"@id": "schema:GovernmentBuilding"},
        "GovernmentOffice": {"@id": "schema:GovernmentOffice"},
        "GovernmentOrganization": {"@id": "schema:GovernmentOrganization"},
        "GovernmentPermit": {"@id": "schema:GovernmentPermit"},
        "GovernmentService": {"@id": "schema:GovernmentService"},
        "Grant": {"@id": "schema:Grant"},
        "GraphicNovel": {"@id": "schema:GraphicNovel"},
        "GroceryStore": {"@id": "schema:GroceryStore"},
        "GroupBoardingPolicy": {"@id": "schema:GroupBoardingPolicy"},
        "Guide": {"@id": "schema:Guide"},
        "Gynecologic": {"@id": "schema:Gynecologic"},
        "HVACBusiness": {"@id": "schema:HVACBusiness"},
        "Hackathon": {"@id": "schema:Hackathon"},
        "HairSalon": {"@id": "schema:HairSalon"},
        "HalalDiet": {"@id": "schema:HalalDiet"},
        "Hardcover": {"@id": "schema:Hardcover"},
        "HardwareStore": {"@id": "schema:HardwareStore"},
        "Head": {"@id": "schema:Head"},
        "HealthAndBeautyBusiness": {"@id": "schema:HealthAndBeautyBusiness"},
        "HealthAspectEnumeration": {"@id": "schema:HealthAspectEnumeration"},
        "HealthCare": {"@id": "schema:HealthCare"},
        "HealthClub": {"@id": "schema:HealthClub"},
        "HealthInsurancePlan": {"@id": "schema:HealthInsurancePlan"},
        "HealthPlanCostSharingSpecification": {"@id": "schema:HealthPlanCostSharingSpecification"},
        "HealthPlanFormulary": {"@id": "schema:HealthPlanFormulary"},
        "HealthPlanNetwork": {"@id": "schema:HealthPlanNetwork"},
        "HealthTopicContent": {"@id": "schema:HealthTopicContent"},
        "HearingImpairedSupported": {"@id": "schema:HearingImpairedSupported"},
        "Hematologic": {"@id": "schema:Hematologic"},
        "HighSchool": {"@id": "schema:HighSchool"},
        "HinduDiet": {"@id": "schema:HinduDiet"},
        "HinduTemple": {"@id": "schema:HinduTemple"},
        "HobbyShop": {"@id": "schema:HobbyShop"},
        "HomeAndConstructionBusiness": {"@id": "schema:HomeAndConstructionBusiness"},
        "HomeGoodsStore": {"@id": "schema:HomeGoodsStore"},
        "Homeopathic": {"@id": "schema:Homeopathic"},
        "Hospital": {"@id": "schema:Hospital"},
        "Hostel": {"@id": "schema:Hostel"},
        "Hotel": {"@id": "schema:Hotel"},
        "HotelRoom": {"@id": "schema:HotelRoom"},
        "House": {"@id": "schema:House"},
        "HousePainter": {"@id": "schema:HousePainter"},
        "HowOrWhereHealthAspect": {"@id": "schema:HowOrWhereHealthAspect"},
        "HowTo": {"@id": "schema:HowTo"},
        "HowToDirection": {"@id": "schema:HowToDirection"},
        "HowToItem": {"@id": "schema:HowToItem"},
        "HowToSection": {"@id": "schema:HowToSection"},
        "HowToStep": {"@id": "schema:HowToStep"},
        "HowToSupply": {"@id": "schema:HowToSupply"},
        "HowToTip": {"@id": "schema:HowToTip"},
        "HowToTool": {"@id": "schema:HowToTool"},
        "IceCreamShop": {"@id": "schema:IceCreamShop"},
        "IgnoreAction": {"@id": "schema:IgnoreAction"},
        "ImageGallery": {"@id": "schema:ImageGallery"},
        "ImageObject": {"@id": "schema:ImageObject"},
        "ImagingTest": {"@id": "schema:ImagingTest"},
        "InForce": {"@id": "schema:InForce"},
        "InStock": {"@id": "schema:InStock"},
        "InStoreOnly": {"@id": "schema:InStoreOnly"},
        "IndividualProduct": {"@id": "schema:IndividualProduct"},
        "Infectious": {"@id": "schema:Infectious"},
        "InfectiousAgentClass": {"@id": "schema:InfectiousAgentClass"},
        "InfectiousDisease": {"@id": "schema:InfectiousDisease"},
        "InformAction": {"@id": "schema:InformAction"},
        "InsertAction": {"@id": "schema:InsertAction"},
        "InstallAction": {"@id": "schema:InstallAction"},
        "InsuranceAgency": {"@id": "schema:InsuranceAgency"},
        "Intangible": {"@id": "schema:Intangible"},
        "Integer": {"@id": "schema:Integer"},
        "InteractAction": {"@id": "schema:InteractAction"},
        "InteractionCounter": {"@id": "schema:InteractionCounter"},
        "InternationalTrial": {"@id": "schema:InternationalTrial"},
        "InternetCafe": {"@id": "schema:InternetCafe"},
        "InvestmentFund": {"@id": "schema:InvestmentFund"},
        "InvestmentOrDeposit": {"@id": "schema:InvestmentOrDeposit"},
        "InviteAction": {"@id": "schema:InviteAction"},
        "Invoice": {"@id": "schema:Invoice"},
        "ItemAvailability": {"@id": "schema:ItemAvailability"},
        "ItemList": {"@id": "schema:ItemList"},
        "ItemListOrderAscending": {"@id": "schema:ItemListOrderAscending"},
        "ItemListOrderDescending": {"@id": "schema:ItemListOrderDescending"},
        "ItemListOrderType": {"@id": "schema:ItemListOrderType"},
        "ItemListUnordered": {"@id": "schema:ItemListUnordered"},
        "ItemPage": {"@id": "schema:ItemPage"},
        "JewelryStore": {"@id": "schema:JewelryStore"},
        "JobPosting": {"@id": "schema:JobPosting"},
        "JoinAction": {"@id": "schema:JoinAction"},
        "Joint": {"@id": "schema:Joint"},
        "KosherDiet": {"@id": "schema:KosherDiet"},
        "LaboratoryScience": {"@id": "schema:LaboratoryScience"},
        "LakeBodyOfWater": {"@id": "schema:LakeBodyOfWater"},
        "Landform": {"@id": "schema:Landform"},
        "LandmarksOrHistoricalBuildings": {"@id": "schema:LandmarksOrHistoricalBuildings"},
        "Language": {"@id": "schema:Language"},
        "LaserDiscFormat": {"@id": "schema:LaserDiscFormat"},
        "LeaveAction": {"@id": "schema:LeaveAction"},
        "LeftHandDriving": {"@id": "schema:LeftHandDriving"},
        "LegalForceStatus": {"@id": "schema:LegalForceStatus"},
        "LegalService": {"@id": "schema:LegalService"},
        "LegalValueLevel": {"@id": "schema:LegalValueLevel"},
        "Legislation": {"@id": "schema:Legislation"},
        "LegislationObject": {"@id": "schema:LegislationObject"},
        "LegislativeBuilding": {"@id": "schema:LegislativeBuilding"},
        "LeisureTimeActivity": {"@id": "schema:LeisureTimeActivity"},
        "LendAction": {"@id": "schema:LendAction"},
        "Library": {"@id": "schema:Library"},
        "LibrarySystem": {"@id": "schema:LibrarySystem"},
        "LifestyleModification": {"@id": "schema:LifestyleModification"},
        "Ligament": {"@id": "schema:Ligament"},
        "LikeAction": {"@id": "schema:LikeAction"},
        "LimitedAvailability": {"@id": "schema:LimitedAvailability"},
        "LimitedByGuaranteeCharity": {"@id": "schema:LimitedByGuaranteeCharity"},
        "LinkRole": {"@id": "schema:LinkRole"},
        "LiquorStore": {"@id": "schema:LiquorStore"},
        "ListItem": {"@id": "schema:ListItem"},
        "ListenAction": {"@id": "schema:ListenAction"},
        "LiteraryEvent": {"@id": "schema:LiteraryEvent"},
        "LiveAlbum": {"@id": "schema:LiveAlbum"},
        "LiveBlogPosting": {"@id": "schema:LiveBlogPosting"},
        "LivingWithHealthAspect": {"@id": "schema:LivingWithHealthAspect"},
        "LoanOrCredit": {"@id": "schema:LoanOrCredit"},
        "LocalBusiness": {"@id": "schema:LocalBusiness"},
        "LocationFeatureSpecification": {"@id": "schema:LocationFeatureSpecification"},
        "LockerDelivery": {"@id": "schema:LockerDelivery"},
        "Locksmith": {"@id": "schema:Locksmith"},
        "LodgingBusiness": {"@id": "schema:LodgingBusiness"},
        "LodgingReservation": {"@id": "schema:LodgingReservation"},
        "Longitudinal": {"@id": "schema:Longitudinal"},
        "LoseAction": {"@id": "schema:LoseAction"},
        "LowCalorieDiet": {"@id": "schema:LowCalorieDiet"},
        "LowFatDiet": {"@id": "schema:LowFatDiet"},
        "LowLactoseDiet": {"@id": "schema:LowLactoseDiet"},
        "LowSaltDiet": {"@id": "schema:LowSaltDiet"},
        "Lung": {"@id": "schema:Lung"},
        "LymphaticVessel": {"@id": "schema:LymphaticVessel"},
        "MRI": {"@id": "schema:MRI"},
        "Male": {"@id": "schema:Male"},
        "Manuscript": {"@id": "schema:Manuscript"},
        "Map": {"@id": "schema:Map"},
        "MapCategoryType": {"@id": "schema:MapCategoryType"},
        "MarryAction": {"@id": "schema:MarryAction"},
        "Mass": {"@id": "schema:Mass"},
        "MaximumDoseSchedule": {"@id": "schema:MaximumDoseSchedule"},
        "MayTreatHealthAspect": {"@id": "schema:MayTreatHealthAspect"},
        "MediaGallery": {"@id": "schema:MediaGallery"},
        "MediaManipulationRatingEnumeration": {"@id": "schema:MediaManipulationRatingEnumeration"},
        "MediaObject": {"@id": "schema:MediaObject"},
        "MediaReview": {"@id": "schema:MediaReview"},
        "MediaSubscription": {"@id": "schema:MediaSubscription"},
        "MedicalAudience": {"@id": "schema:MedicalAudience"},
        "MedicalBusiness": {"@id": "schema:MedicalBusiness"},
        "MedicalCause": {"@id": "schema:MedicalCause"},
        "MedicalClinic": {"@id": "schema:MedicalClinic"},
        "MedicalCode": {"@id": "schema:MedicalCode"},
        "MedicalCondition": {"@id": "schema:MedicalCondition"},
        "MedicalConditionStage": {"@id": "schema:MedicalConditionStage"},
        "MedicalContraindication": {"@id": "schema:MedicalContraindication"},
        "MedicalDevice": {"@id": "schema:MedicalDevice"},
        "MedicalDevicePurpose": {"@id": "schema:MedicalDevicePurpose"},
        "MedicalEntity": {"@id": "schema:MedicalEntity"},
        "MedicalEnumeration": {"@id": "schema:MedicalEnumeration"},
        "MedicalEvidenceLevel": {"@id": "schema:MedicalEvidenceLevel"},
        "MedicalGuideline": {"@id": "schema:MedicalGuideline"},
        "MedicalGuidelineContraindication": {"@id": "schema:MedicalGuidelineContraindication"},
        "MedicalGuidelineRecommendation": {"@id": "schema:MedicalGuidelineRecommendation"},
        "MedicalImagingTechnique": {"@id": "schema:MedicalImagingTechnique"},
        "MedicalIndication": {"@id": "schema:MedicalIndication"},
        "MedicalIntangible": {"@id": "schema:MedicalIntangible"},
        "MedicalObservationalStudy": {"@id": "schema:MedicalObservationalStudy"},
        "MedicalObservationalStudyDesign": {"@id": "schema:MedicalObservationalStudyDesign"},
        "MedicalOrganization": {"@id": "schema:MedicalOrganization"},
        "MedicalProcedure": {"@id": "schema:MedicalProcedure"},
        "MedicalProcedureType": {"@id": "schema:MedicalProcedureType"},
        "MedicalResearcher": {"@id": "schema:MedicalResearcher"},
        "MedicalRiskCalculator": {"@id": "schema:MedicalRiskCalculator"},
        "MedicalRiskEstimator": {"@id": "schema:MedicalRiskEstimator"},
        "MedicalRiskFactor": {"@id": "schema:MedicalRiskFactor"},
        "MedicalRiskScore": {"@id": "schema:MedicalRiskScore"},
        "MedicalScholarlyArticle": {"@id": "schema:MedicalScholarlyArticle"},
        "MedicalSign": {"@id": "schema:MedicalSign"},
        "MedicalSignOrSymptom": {"@id": "schema:MedicalSignOrSymptom"},
        "MedicalSpecialty": {"@id": "schema:MedicalSpecialty"},
        "MedicalStudy": {"@id": "schema:MedicalStudy"},
        "MedicalStudyStatus": {"@id": "schema:MedicalStudyStatus"},
        "MedicalSymptom": {"@id": "schema:MedicalSymptom"},
        "MedicalTest": {"@id": "schema:MedicalTest"},
        "MedicalTestPanel": {"@id": "schema:MedicalTestPanel"},
        "MedicalTherapy": {"@id": "schema:MedicalTherapy"},
        "MedicalTrial": {"@id": "schema:MedicalTrial"},
        "MedicalTrialDesign": {"@id": "schema:MedicalTrialDesign"},
        "MedicalWebPage": {"@id": "schema:MedicalWebPage"},
        "MedicineSystem": {"@id": "schema:MedicineSystem"},
        "MeetingRoom": {"@id": "schema:MeetingRoom"},
        "MensClothingStore": {"@id": "schema:MensClothingStore"},
        "Menu": {"@id": "schema:Menu"},
        "MenuItem": {"@id": "schema:MenuItem"},
        "MenuSection": {"@id": "schema:MenuSection"},
        "MerchantReturnEnumeration": {"@id": "schema:MerchantReturnEnumeration"},
        "MerchantReturnFiniteReturnWindow": {"@id": "schema:MerchantReturnFiniteReturnWindow"},
        "MerchantReturnNotPermitted": {"@id": "schema:MerchantReturnNotPermitted"},
        "MerchantReturnPolicy": {"@id": "schema:MerchantReturnPolicy"},
        "MerchantReturnUnlimitedWindow": {"@id": "schema:MerchantReturnUnlimitedWindow"},
        "MerchantReturnUnspecified": {"@id": "schema:MerchantReturnUnspecified"},
        "Message": {"@id": "schema:Message"},
        "MiddleSchool": {"@id": "schema:MiddleSchool"},
        "Midwifery": {"@id": "schema:Midwifery"},
        "MisconceptionsHealthAspect": {"@id": "schema:MisconceptionsHealthAspect"},
        "MissingContext": {"@id": "schema:MissingContext"},
        "MixedEventAttendanceMode": {"@id": "schema:MixedEventAttendanceMode"},
        "MixtapeAlbum": {"@id": "schema:MixtapeAlbum"},
        "MobileApplication": {"@id": "schema:MobileApplication"},
        "MobilePhoneStore": {"@id": "schema:MobilePhoneStore"},
        "Monday": {"@id": "schema:Monday"},
        "MonetaryAmount": {"@id": "schema:MonetaryAmount"},
        "MonetaryAmountDistribution": {"@id": "schema:MonetaryAmountDistribution"},
        "MonetaryGrant": {"@id": "schema:MonetaryGrant"},
        "MoneyTransfer": {"@id": "schema:MoneyTransfer"},
        "MortgageLoan": {"@id": "schema:MortgageLoan"},
        "Mosque": {"@id": "schema:Mosque"},
        "Motel": {"@id": "schema:Motel"},
        "Motorcycle": {"@id": "schema:Motorcycle"},
        "MotorcycleDealer": {"@id": "schema:MotorcycleDealer"},
        "MotorcycleRepair": {"@id": "schema:MotorcycleRepair"},
        "MotorizedBicycle": {"@id": "schema:MotorizedBicycle"},
        "Mountain": {"@id": "schema:Mountain"},
        "MoveAction": {"@id": "schema:MoveAction"},
        "Movie": {"@id": "schema:Movie"},
        "MovieClip": {"@id": "schema:MovieClip"},
        "MovieRentalStore": {"@id": "schema:MovieRentalStore"},
        "MovieSeries": {"@id": "schema:MovieSeries"},
        "MovieTheater": {"@id": "schema:MovieTheater"},
        "MovingCompany": {"@id": "schema:MovingCompany"},
        "MultiCenterTrial": {"@id": "schema:MultiCenterTrial"},
        "MultiPlayer": {"@id": "schema:MultiPlayer"},
        "MulticellularParasite": {"@id": "schema:MulticellularParasite"},
        "Muscle": {"@id": "schema:Muscle"},
        "Musculoskeletal": {"@id": "schema:Musculoskeletal"},
        "MusculoskeletalExam": {"@id": "schema:MusculoskeletalExam"},
        "Museum": {"@id": "schema:Museum"},
        "MusicAlbum": {"@id": "schema:MusicAlbum"},
        "MusicAlbumProductionType": {"@id": "schema:MusicAlbumProductionType"},
        "MusicAlbumReleaseType": {"@id": "schema:MusicAlbumReleaseType"},
        "MusicComposition": {"@id": "schema:MusicComposition"},
        "MusicEvent": {"@id": "schema:MusicEvent"},
        "MusicGroup": {"@id": "schema:MusicGroup"},
        "MusicPlaylist": {"@id": "schema:MusicPlaylist"},
        "MusicRecording": {"@id": "schema:MusicRecording"},
        "MusicRelease": {"@id": "schema:MusicRelease"},
        "MusicReleaseFormatType": {"@id": "schema:MusicReleaseFormatType"},
        "MusicStore": {"@id": "schema:MusicStore"},
        "MusicVenue": {"@id": "schema:MusicVenue"},
        "MusicVideoObject": {"@id": "schema:MusicVideoObject"},
        "NGO": {"@id": "schema:NGO"},
        "NLNonprofitType": {"@id": "schema:NLNonprofitType"},
        "NailSalon": {"@id": "schema:NailSalon"},
        "Neck": {"@id": "schema:Neck"},
        "Nerve": {"@id": "schema:Nerve"},
        "Neuro": {"@id": "schema:Neuro"},
        "Neurologic": {"@id": "schema:Neurologic"},
        "NewCondition": {"@id": "schema:NewCondition"},
        "NewsArticle": {"@id": "schema:NewsArticle"},
        "NewsMediaOrganization": {"@id": "schema:NewsMediaOrganization"},
        "Newspaper": {"@id": "schema:Newspaper"},
        "NightClub": {"@id": "schema:NightClub"},
        "NoninvasiveProcedure": {"@id": "schema:NoninvasiveProcedure"},
        "Nonprofit501a": {"@id": "schema:Nonprofit501a"},
        "Nonprofit501c1": {"@id": "schema:Nonprofit501c1"},
        "Nonprofit501c10": {"@id": "schema:Nonprofit501c10"},
        "Nonprofit501c11": {"@id": "schema:Nonprofit501c11"},
        "Nonprofit501c12": {"@id": "schema:Nonprofit501c12"},
        "Nonprofit501c13": {"@id": "schema:Nonprofit501c13"},
        "Nonprofit501c14": {"@id": "schema:Nonprofit501c14"},
        "Nonprofit501c15": {"@id": "schema:Nonprofit501c15"},
        "Nonprofit501c16": {"@id": "schema:Nonprofit501c16"},
        "Nonprofit501c17": {"@id": "schema:Nonprofit501c17"},
        "Nonprofit501c18": {"@id": "schema:Nonprofit501c18"},
        "Nonprofit501c19": {"@id": "schema:Nonprofit501c19"},
        "Nonprofit501c2": {"@id": "schema:Nonprofit501c2"},
        "Nonprofit501c20": {"@id": "schema:Nonprofit501c20"},
        "Nonprofit501c21": {"@id": "schema:Nonprofit501c21"},
        "Nonprofit501c22": {"@id": "schema:Nonprofit501c22"},
        "Nonprofit501c23": {"@id": "schema:Nonprofit501c23"},
        "Nonprofit501c24": {"@id": "schema:Nonprofit501c24"},
        "Nonprofit501c25": {"@id": "schema:Nonprofit501c25"},
        "Nonprofit501c26": {"@id": "schema:Nonprofit501c26"},
        "Nonprofit501c27": {"@id": "schema:Nonprofit501c27"},
        "Nonprofit501c28": {"@id": "schema:Nonprofit501c28"},
        "Nonprofit501c3": {"@id": "schema:Nonprofit501c3"},
        "Nonprofit501c4": {"@id": "schema:Nonprofit501c4"},
        "Nonprofit501c5": {"@id": "schema:Nonprofit501c5"},
        "Nonprofit501c6": {"@id": "schema:Nonprofit501c6"},
        "Nonprofit501c7": {"@id": "schema:Nonprofit501c7"},
        "Nonprofit501c8": {"@id": "schema:Nonprofit501c8"},
        "Nonprofit501c9": {"@id": "schema:Nonprofit501c9"},
        "Nonprofit501d": {"@id": "schema:Nonprofit501d"},
        "Nonprofit501e": {"@id": "schema:Nonprofit501e"},
        "Nonprofit501f": {"@id": "schema:Nonprofit501f"},
        "Nonprofit501k": {"@id": "schema:Nonprofit501k"},
        "Nonprofit501n": {"@id": "schema:Nonprofit501n"},
        "Nonprofit501q": {"@id": "schema:Nonprofit501q"},
        "Nonprofit527": {"@id": "schema:Nonprofit527"},
        "NonprofitANBI": {"@id": "schema:NonprofitANBI"},
        "NonprofitSBBI": {"@id": "schema:NonprofitSBBI"},
        "NonprofitType": {"@id": "schema:NonprofitType"},
        "Nose": {"@id": "schema:Nose"},
        "NotInForce": {"@id": "schema:NotInForce"},
        "NotYetRecruiting": {"@id": "schema:NotYetRecruiting"},
        "Notary": {"@id": "schema:Notary"},
        "NoteDigitalDocument": {"@id": "schema:NoteDigitalDocument"},
        "Number": {"@id": "schema:Number"},
        "Nursing": {"@id": "schema:Nursing"},
        "NutritionInformation": {"@id": "schema:NutritionInformation"},
        "OTC": {"@id": "schema:OTC"},
        "Observation": {"@id": "schema:Observation"},
        "Observational": {"@id": "schema:Observational"},
        "Obstetric": {"@id": "schema:Obstetric"},
        "Occupation": {"@id": "schema:Occupation"},
        "OccupationalActivity": {"@id": "schema:OccupationalActivity"},
        "OccupationalTherapy": {"@id": "schema:OccupationalTherapy"},
        "OceanBodyOfWater": {"@id": "schema:OceanBodyOfWater"},
        "Offer": {"@id": "schema:Offer"},
        "OfferCatalog": {"@id": "schema:OfferCatalog"},
        "OfferForLease": {"@id": "schema:OfferForLease"},
        "OfferForPurchase": {"@id": "schema:OfferForPurchase"},
        "OfferItemCondition": {"@id": "schema:OfferItemCondition"},
        "OfferShippingDetails": {"@id": "schema:OfferShippingDetails"},
        "OfficeEquipmentStore": {"@id": "schema:OfficeEquipmentStore"},
        "OfficialLegalValue": {"@id": "schema:OfficialLegalValue"},
        "OfflineEventAttendanceMode": {"@id": "schema:OfflineEventAttendanceMode"},
        "OfflinePermanently": {"@id": "schema:OfflinePermanently"},
        "OfflineTemporarily": {"@id": "schema:OfflineTemporarily"},
        "OnDemandEvent": {"@id": "schema:OnDemandEvent"},
        "OnSitePickup": {"@id": "schema:OnSitePickup"},
        "Oncologic": {"@id": "schema:Oncologic"},
        "OneTimePayments": {"@id": "schema:OneTimePayments"},
        "Online": {"@id": "schema:Online"},
        "OnlineEventAttendanceMode": {"@id": "schema:OnlineEventAttendanceMode"},
        "OnlineFull": {"@id": "schema:OnlineFull"},
        "OnlineOnly": {"@id": "schema:OnlineOnly"},
        "OpenTrial": {"@id": "schema:OpenTrial"},
        "OpeningHoursSpecification": {"@id": "schema:OpeningHoursSpecification"},
        "OpinionNewsArticle": {"@id": "schema:OpinionNewsArticle"},
        "Optician": {"@id": "schema:Optician"},
        "Optometric": {"@id": "schema:Optometric"},
        "Order": {"@id": "schema:Order"},
        "OrderAction": {"@id": "schema:OrderAction"},
        "OrderCancelled": {"@id": "schema:OrderCancelled"},
        "OrderDelivered": {"@id": "schema:OrderDelivered"},
        "OrderInTransit": {"@id": "schema:OrderInTransit"},
        "OrderItem": {"@id": "schema:OrderItem"},
        "OrderPaymentDue": {"@id": "schema:OrderPaymentDue"},
        "OrderPickupAvailable": {"@id": "schema:OrderPickupAvailable"},
        "OrderProblem": {"@id": "schema:OrderProblem"},
        "OrderProcessing": {"@id": "schema:OrderProcessing"},
        "OrderReturned": {"@id": "schema:OrderReturned"},
        "OrderStatus": {"@id": "schema:OrderStatus"},
        "Organization": {"@id": "schema:Organization"},
        "OrganizationRole": {"@id": "schema:OrganizationRole"},
        "OrganizeAction": {"@id": "schema:OrganizeAction"},
        "OriginalShippingFees": {"@id": "schema:OriginalShippingFees"},
        "Osteopathic": {"@id": "schema:Osteopathic"},
        "Otolaryngologic": {"@id": "schema:Otolaryngologic"},
        "OutOfStock": {"@id": "schema:OutOfStock"},
        "OutletStore": {"@id": "schema:OutletStore"},
        "OverviewHealthAspect": {"@id": "schema:OverviewHealthAspect"},
        "OwnershipInfo": {"@id": "schema:OwnershipInfo"},
        "PET": {"@id": "schema:PET"},
        "PaidLeave": {"@id": "schema:PaidLeave"},
        "PaintAction": {"@id": "schema:PaintAction"},
        "Painting": {"@id": "schema:Painting"},
        "PalliativeProcedure": {"@id": "schema:PalliativeProcedure"},
        "Paperback": {"@id": "schema:Paperback"},
        "ParcelDelivery": {"@id": "schema:ParcelDelivery"},
        "ParcelService": {"@id": "schema:ParcelService"},
        "ParentAudience": {"@id": "schema:ParentAudience"},
        "ParentalSupport": {"@id": "schema:ParentalSupport"},
        "Park": {"@id": "schema:Park"},
        "ParkingFacility": {"@id": "schema:ParkingFacility"},
        "ParkingMap": {"@id": "schema:ParkingMap"},
        "PartiallyInForce": {"@id": "schema:PartiallyInForce"},
        "Pathology": {"@id": "schema:Pathology"},
        "PathologyTest": {"@id": "schema:PathologyTest"},
        "Patient": {"@id": "schema:Patient"},
        "PatientExperienceHealthAspect": {"@id": "schema:PatientExperienceHealthAspect"},
        "PawnShop": {"@id": "schema:PawnShop"},
        "PayAction": {"@id": "schema:PayAction"},
        "PaymentAutomaticallyApplied": {"@id": "schema:PaymentAutomaticallyApplied"},
        "PaymentCard": {"@id": "schema:PaymentCard"},
        "PaymentChargeSpecification": {"@id": "schema:PaymentChargeSpecification"},
        "PaymentComplete": {"@id": "schema:PaymentComplete"},
        "PaymentDeclined": {"@id": "schema:PaymentDeclined"},
        "PaymentDue": {"@id": "schema:PaymentDue"},
        "PaymentMethod": {"@id": "schema:PaymentMethod"},
        "PaymentPastDue": {"@id": "schema:PaymentPastDue"},
        "PaymentService": {"@id": "schema:PaymentService"},
        "PaymentStatusType": {"@id": "schema:PaymentStatusType"},
        "Pediatric": {"@id": "schema:Pediatric"},
        "PeopleAudience": {"@id": "schema:PeopleAudience"},
        "PercutaneousProcedure": {"@id": "schema:PercutaneousProcedure"},
        "PerformAction": {"@id": "schema:PerformAction"},
        "PerformanceRole": {"@id": "schema:PerformanceRole"},
        "PerformingArtsTheater": {"@id": "schema:PerformingArtsTheater"},
        "PerformingGroup": {"@id": "schema:PerformingGroup"},
        "Periodical": {"@id": "schema:Periodical"},
        "Permit": {"@id": "schema:Permit"},
        "Person": {"@id": "schema:Person"},
        "PetStore": {"@id": "schema:PetStore"},
        "Pharmacy": {"@id": "schema:Pharmacy"},
        "PharmacySpecialty": {"@id": "schema:PharmacySpecialty"},
        "Photograph": {"@id": "schema:Photograph"},
        "PhotographAction": {"@id": "schema:PhotographAction"},
        "PhysicalActivity": {"@id": "schema:PhysicalActivity"},
        "PhysicalActivityCategory": {"@id": "schema:PhysicalActivityCategory"},
        "PhysicalExam": {"@id": "schema:PhysicalExam"},
        "PhysicalTherapy": {"@id": "schema:PhysicalTherapy"},
        "Physician": {"@id": "schema:Physician"},
        "Physiotherapy": {"@id": "schema:Physiotherapy"},
        "Place": {"@id": "schema:Place"},
        "PlaceOfWorship": {"@id": "schema:PlaceOfWorship"},
        "PlaceboControlledTrial": {"@id": "schema:PlaceboControlledTrial"},
        "PlanAction": {"@id": "schema:PlanAction"},
        "PlasticSurgery": {"@id": "schema:PlasticSurgery"},
        "Play": {"@id": "schema:Play"},
        "PlayAction": {"@id": "schema:PlayAction"},
        "Playground": {"@id": "schema:Playground"},
        "Plumber": {"@id": "schema:Plumber"},
        "PodcastEpisode": {"@id": "schema:PodcastEpisode"},
        "PodcastSeason": {"@id": "schema:PodcastSeason"},
        "PodcastSeries": {"@id": "schema:PodcastSeries"},
        "Podiatric": {"@id": "schema:Podiatric"},
        "PoliceStation": {"@id": "schema:PoliceStation"},
        "Pond": {"@id": "schema:Pond"},
        "PostOffice": {"@id": "schema:PostOffice"},
        "PostalAddress": {"@id": "schema:PostalAddress"},
        "PostalCodeRangeSpecification": {"@id": "schema:PostalCodeRangeSpecification"},
        "Poster": {"@id": "schema:Poster"},
        "PotentialActionStatus": {"@id": "schema:PotentialActionStatus"},
        "PreOrder": {"@id": "schema:PreOrder"},
        "PreOrderAction": {"@id": "schema:PreOrderAction"},
        "PreSale": {"@id": "schema:PreSale"},
        "PrependAction": {"@id": "schema:PrependAction"},
        "Preschool": {"@id": "schema:Preschool"},
        "PrescriptionOnly": {"@id": "schema:PrescriptionOnly"},
        "PresentationDigitalDocument": {"@id": "schema:PresentationDigitalDocument"},
        "PreventionHealthAspect": {"@id": "schema:PreventionHealthAspect"},
        "PreventionIndication": {"@id": "schema:PreventionIndication"},
        "PriceSpecification": {"@id": "schema:PriceSpecification"},
        "PrimaryCare": {"@id": "schema:PrimaryCare"},
        "Prion": {"@id": "schema:Prion"},
        "Product": {"@id": "schema:Product"},
        "ProductModel": {"@id": "schema:ProductModel"},
        "ProductReturnEnumeration": {"@id": "schema:ProductReturnEnumeration"},
        "ProductReturnFiniteReturnWindow": {"@id": "schema:ProductReturnFiniteReturnWindow"},
        "ProductReturnNotPermitted": {"@id": "schema:ProductReturnNotPermitted"},
        "ProductReturnPolicy": {"@id": "schema:ProductReturnPolicy"},
        "ProductReturnUnlimitedWindow": {"@id": "schema:ProductReturnUnlimitedWindow"},
        "ProductReturnUnspecified": {"@id": "schema:ProductReturnUnspecified"},
        "ProfessionalService": {"@id": "schema:ProfessionalService"},
        "ProfilePage": {"@id": "schema:ProfilePage"},
        "PrognosisHealthAspect": {"@id": "schema:PrognosisHealthAspect"},
        "ProgramMembership": {"@id": "schema:ProgramMembership"},
        "Project": {"@id": "schema:Project"},
        "PronounceableText": {"@id": "schema:PronounceableText"},
        "Property": {"@id": "schema:Property"},
        "PropertyValue": {"@id": "schema:PropertyValue"},
        "PropertyValueSpecification": {"@id": "schema:PropertyValueSpecification"},
        "Protozoa": {"@id": "schema:Protozoa"},
        "Psychiatric": {"@id": "schema:Psychiatric"},
        "PsychologicalTreatment": {"@id": "schema:PsychologicalTreatment"},
        "PublicHealth": {"@id": "schema:PublicHealth"},
        "PublicHolidays": {"@id": "schema:PublicHolidays"},
        "PublicSwimmingPool": {"@id": "schema:PublicSwimmingPool"},
        "PublicToilet": {"@id": "schema:PublicToilet"},
        "PublicationEvent": {"@id": "schema:PublicationEvent"},
        "PublicationIssue": {"@id": "schema:PublicationIssue"},
        "PublicationVolume": {"@id": "schema:PublicationVolume"},
        "Pulmonary": {"@id": "schema:Pulmonary"},
        "QAPage": {"@id": "schema:QAPage"},
        "QualitativeValue": {"@id": "schema:QualitativeValue"},
        "QuantitativeValue": {"@id": "schema:QuantitativeValue"},
        "QuantitativeValueDistribution": {"@id": "schema:QuantitativeValueDistribution"},
        "Quantity": {"@id": "schema:Quantity"},
        "Question": {"@id": "schema:Question"},
        "Quotation": {"@id": "schema:Quotation"},
        "QuoteAction": {"@id": "schema:QuoteAction"},
        "RVPark": {"@id": "schema:RVPark"},
        "RadiationTherapy": {"@id": "schema:RadiationTherapy"},
        "RadioBroadcastService": {"@id": "schema:RadioBroadcastService"},
        "RadioChannel": {"@id": "schema:RadioChannel"},
        "RadioClip": {"@id": "schema:RadioClip"},
        "RadioEpisode": {"@id": "schema:RadioEpisode"},
        "RadioSeason": {"@id": "schema:RadioSeason"},
        "RadioSeries": {"@id": "schema:RadioSeries"},
        "RadioStation": {"@id": "schema:RadioStation"},
        "Radiography": {"@id": "schema:Radiography"},
        "RandomizedTrial": {"@id": "schema:RandomizedTrial"},
        "Rating": {"@id": "schema:Rating"},
        "ReactAction": {"@id": "schema:ReactAction"},
        "ReadAction": {"@id": "schema:ReadAction"},
        "ReadPermission": {"@id": "schema:ReadPermission"},
        "RealEstateAgent": {"@id": "schema:RealEstateAgent"},
        "RealEstateListing": {"@id": "schema:RealEstateListing"},
        "RearWheelDriveConfiguration": {"@id": "schema:RearWheelDriveConfiguration"},
        "ReceiveAction": {"@id": "schema:ReceiveAction"},
        "Recipe": {"@id": "schema:Recipe"},
        "Recommendation": {"@id": "schema:Recommendation"},
        "RecommendedDoseSchedule": {"@id": "schema:RecommendedDoseSchedule"},
        "Recruiting": {"@id": "schema:Recruiting"},
        "RecyclingCenter": {"@id": "schema:RecyclingCenter"},
        "RefundTypeEnumeration": {"@id": "schema:RefundTypeEnumeration"},
        "RefurbishedCondition": {"@id": "schema:RefurbishedCondition"},
        "RegisterAction": {"@id": "schema:RegisterAction"},
        "Registry": {"@id": "schema:Registry"},
        "ReimbursementCap": {"@id": "schema:ReimbursementCap"},
        "RejectAction": {"@id": "schema:RejectAction"},
        "RelatedTopicsHealthAspect": {"@id": "schema:RelatedTopicsHealthAspect"},
        "RemixAlbum": {"@id": "schema:RemixAlbum"},
        "Renal": {"@id": "schema:Renal"},
        "RentAction": {"@id": "schema:RentAction"},
        "RentalCarReservation": {"@id": "schema:RentalCarReservation"},
        "RentalVehicleUsage": {"@id": "schema:RentalVehicleUsage"},
        "RepaymentSpecification": {"@id": "schema:RepaymentSpecification"},
        "ReplaceAction": {"@id": "schema:ReplaceAction"},
        "ReplyAction": {"@id": "schema:ReplyAction"},
        "Report": {"@id": "schema:Report"},
        "ReportageNewsArticle": {"@id": "schema:ReportageNewsArticle"},
        "ReportedDoseSchedule": {"@id": "schema:ReportedDoseSchedule"},
        "ResearchProject": {"@id": "schema:ResearchProject"},
        "Researcher": {"@id": "schema:Researcher"},
        "Reservation": {"@id": "schema:Reservation"},
        "ReservationCancelled": {"@id": "schema:ReservationCancelled"},
        "ReservationConfirmed": {"@id": "schema:ReservationConfirmed"},
        "ReservationHold": {"@id": "schema:ReservationHold"},
        "ReservationPackage": {"@id": "schema:ReservationPackage"},
        "ReservationPending": {"@id": "schema:ReservationPending"},
        "ReservationStatusType": {"@id": "schema:ReservationStatusType"},
        "ReserveAction": {"@id": "schema:ReserveAction"},
        "Reservoir": {"@id": "schema:Reservoir"},
        "Residence": {"@id": "schema:Residence"},
        "Resort": {"@id": "schema:Resort"},
        "RespiratoryTherapy": {"@id": "schema:RespiratoryTherapy"},
        "Restaurant": {"@id": "schema:Restaurant"},
        "RestockingFees": {"@id": "schema:RestockingFees"},
        "RestrictedDiet": {"@id": "schema:RestrictedDiet"},
        "ResultsAvailable": {"@id": "schema:ResultsAvailable"},
        "ResultsNotAvailable": {"@id": "schema:ResultsNotAvailable"},
        "ResumeAction": {"@id": "schema:ResumeAction"},
        "Retail": {"@id": "schema:Retail"},
        "ReturnAction": {"@id": "schema:ReturnAction"},
        "ReturnFeesEnumeration": {"@id": "schema:ReturnFeesEnumeration"},
        "ReturnShippingFees": {"@id": "schema:ReturnShippingFees"},
        "Review": {"@id": "schema:Review"},
        "ReviewAction": {"@id": "schema:ReviewAction"},
        "ReviewNewsArticle": {"@id": "schema:ReviewNewsArticle"},
        "Rheumatologic": {"@id": "schema:Rheumatologic"},
        "RightHandDriving": {"@id": "schema:RightHandDriving"},
        "RisksOrComplicationsHealthAspect": {"@id": "schema:RisksOrComplicationsHealthAspect"},
        "RiverBodyOfWater": {"@id": "schema:RiverBodyOfWater"},
        "Role": {"@id": "schema:Role"},
        "RoofingContractor": {"@id": "schema:RoofingContractor"},
        "Room": {"@id": "schema:Room"},
        "RsvpAction": {"@id": "schema:RsvpAction"},
        "RsvpResponseMaybe": {"@id": "schema:RsvpResponseMaybe"},
        "RsvpResponseNo": {"@id": "schema:RsvpResponseNo"},
        "RsvpResponseType": {"@id": "schema:RsvpResponseType"},
        "RsvpResponseYes": {"@id": "schema:RsvpResponseYes"},
        "SaleEvent": {"@id": "schema:SaleEvent"},
        "SatiricalArticle": {"@id": "schema:SatiricalArticle"},
        "Saturday": {"@id": "schema:Saturday"},
        "Schedule": {"@id": "schema:Schedule"},
        "ScheduleAction": {"@id": "schema:ScheduleAction"},
        "ScholarlyArticle": {"@id": "schema:ScholarlyArticle"},
        "School": {"@id": "schema:School"},
        "SchoolDistrict": {"@id": "schema:SchoolDistrict"},
        "ScreeningEvent": {"@id": "schema:ScreeningEvent"},
        "ScreeningHealthAspect": {"@id": "schema:ScreeningHealthAspect"},
        "Sculpture": {"@id": "schema:Sculpture"},
        "SeaBodyOfWater": {"@id": "schema:SeaBodyOfWater"},
        "SearchAction": {"@id": "schema:SearchAction"},
        "SearchResultsPage": {"@id": "schema:SearchResultsPage"},
        "Season": {"@id": "schema:Season"},
        "Seat": {"@id": "schema:Seat"},
        "SeatingMap": {"@id": "schema:SeatingMap"},
        "SeeDoctorHealthAspect": {"@id": "schema:SeeDoctorHealthAspect"},
        "SelfCareHealthAspect": {"@id": "schema:SelfCareHealthAspect"},
        "SelfStorage": {"@id": "schema:SelfStorage"},
        "SellAction": {"@id": "schema:SellAction"},
        "SendAction": {"@id": "schema:SendAction"},
        "Series": {"@id": "schema:Series"},
        "Service": {"@id": "schema:Service"},
        "ServiceChannel": {"@id": "schema:ServiceChannel"},
        "ShareAction": {"@id": "schema:ShareAction"},
        "SheetMusic": {"@id": "schema:SheetMusic"},
        "ShippingDeliveryTime": {"@id": "schema:ShippingDeliveryTime"},
        "ShippingRateSettings": {"@id": "schema:ShippingRateSettings"},
        "ShoeStore": {"@id": "schema:ShoeStore"},
        "ShoppingCenter": {"@id": "schema:ShoppingCenter"},
        "ShortStory": {"@id": "schema:ShortStory"},
        "SideEffectsHealthAspect": {"@id": "schema:SideEffectsHealthAspect"},
        "SingleBlindedTrial": {"@id": "schema:SingleBlindedTrial"},
        "SingleCenterTrial": {"@id": "schema:SingleCenterTrial"},
        "SingleFamilyResidence": {"@id": "schema:SingleFamilyResidence"},
        "SinglePlayer": {"@id": "schema:SinglePlayer"},
        "SingleRelease": {"@id": "schema:SingleRelease"},
        "SiteNavigationElement": {"@id": "schema:SiteNavigationElement"},
        "SkiResort": {"@id": "schema:SkiResort"},
        "Skin": {"@id": "schema:Skin"},
        "SocialEvent": {"@id": "schema:SocialEvent"},
        "SocialMediaPosting": {"@id": "schema:SocialMediaPosting"},
        "SoftwareApplication": {"@id": "schema:SoftwareApplication"},
        "SoftwareSourceCode": {"@id": "schema:SoftwareSourceCode"},
        "SoldOut": {"@id": "schema:SoldOut"},
        "SomeProducts": {"@id": "schema:SomeProducts"},
        "SoundtrackAlbum": {"@id": "schema:SoundtrackAlbum"},
        "SpeakableSpecification": {"@id": "schema:SpeakableSpecification"},
        "SpecialAnnouncement": {"@id": "schema:SpecialAnnouncement"},
        "Specialty": {"@id": "schema:Specialty"},
        "SpeechPathology": {"@id": "schema:SpeechPathology"},
        "SpokenWordAlbum": {"@id": "schema:SpokenWordAlbum"},
        "SportingGoodsStore": {"@id": "schema:SportingGoodsStore"},
        "SportsActivityLocation": {"@id": "schema:SportsActivityLocation"},
        "SportsClub": {"@id": "schema:SportsClub"},
        "SportsEvent": {"@id": "schema:SportsEvent"},
        "SportsOrganization": {"@id": "schema:SportsOrganization"},
        "SportsTeam": {"@id": "schema:SportsTeam"},
        "SpreadsheetDigitalDocument": {"@id": "schema:SpreadsheetDigitalDocument"},
        "StadiumOrArena": {"@id": "schema:StadiumOrArena"},
        "StagesHealthAspect": {"@id": "schema:StagesHealthAspect"},
        "State": {"@id": "schema:State"},
        "StatisticalPopulation": {"@id": "schema:StatisticalPopulation"},
        "SteeringPositionValue": {"@id": "schema:SteeringPositionValue"},
        "Store": {"@id": "schema:Store"},
        "StoreCreditRefund": {"@id": "schema:StoreCreditRefund"},
        "StrengthTraining": {"@id": "schema:StrengthTraining"},
        "StructuredValue": {"@id": "schema:StructuredValue"},
        "StudioAlbum": {"@id": "schema:StudioAlbum"},
        "StupidType": {"@id": "schema:StupidType"},
        "SubscribeAction": {"@id": "schema:SubscribeAction"},
        "Substance": {"@id": "schema:Substance"},
        "SubwayStation": {"@id": "schema:SubwayStation"},
        "Suite": {"@id": "schema:Suite"},
        "Sunday": {"@id": "schema:Sunday"},
        "SuperficialAnatomy": {"@id": "schema:SuperficialAnatomy"},
        "Surgical": {"@id": "schema:Surgical"},
        "SurgicalProcedure": {"@id": "schema:SurgicalProcedure"},
        "SuspendAction": {"@id": "schema:SuspendAction"},
        "Suspended": {"@id": "schema:Suspended"},
        "SymptomsHealthAspect": {"@id": "schema:SymptomsHealthAspect"},
        "Synagogue": {"@id": "schema:Synagogue"},
        "TVClip": {"@id": "schema:TVClip"},
        "TVEpisode": {"@id": "schema:TVEpisode"},
        "TVSeason": {"@id": "schema:TVSeason"},
        "TVSeries": {"@id": "schema:TVSeries"},
        "Table": {"@id": "schema:Table"},
        "TakeAction": {"@id": "schema:TakeAction"},
        "TattooParlor": {"@id": "schema:TattooParlor"},
        "Taxi": {"@id": "schema:Taxi"},
        "TaxiReservation": {"@id": "schema:TaxiReservation"},
        "TaxiService": {"@id": "schema:TaxiService"},
        "TaxiStand": {"@id": "schema:TaxiStand"},
        "TaxiVehicleUsage": {"@id": "schema:TaxiVehicleUsage"},
        "TechArticle": {"@id": "schema:TechArticle"},
        "TelevisionChannel": {"@id": "schema:TelevisionChannel"},
        "TelevisionStation": {"@id": "schema:TelevisionStation"},
        "TennisComplex": {"@id": "schema:TennisComplex"},
        "Terminated": {"@id": "schema:Terminated"},
        "Text": {"@id": "schema:Text"},
        "TextDigitalDocument": {"@id": "schema:TextDigitalDocument"},
        "TheaterEvent": {"@id": "schema:TheaterEvent"},
        "TheaterGroup": {"@id": "schema:TheaterGroup"},
        "Therapeutic": {"@id": "schema:Therapeutic"},
        "TherapeuticProcedure": {"@id": "schema:TherapeuticProcedure"},
        "Thesis": {"@id": "schema:Thesis"},
        "Thing": {"@id": "schema:Thing"},
        "Throat": {"@id": "schema:Throat"},
        "Thursday": {"@id": "schema:Thursday"},
        "Ticket": {"@id": "schema:Ticket"},
        "TieAction": {"@id": "schema:TieAction"},
        "Time": {"@id": "schema:Time"},
        "TipAction": {"@id": "schema:TipAction"},
        "TireShop": {"@id": "schema:TireShop"},
        "TollFree": {"@id": "schema:TollFree"},
        "TouristAttraction": {"@id": "schema:TouristAttraction"},
        "TouristDestination": {"@id": "schema:TouristDestination"},
        "TouristInformationCenter": {"@id": "schema:TouristInformationCenter"},
        "TouristTrip": {"@id": "schema:TouristTrip"},
        "Toxicologic": {"@id": "schema:Toxicologic"},
        "ToyStore": {"@id": "schema:ToyStore"},
        "TrackAction": {"@id": "schema:TrackAction"},
        "TradeAction": {"@id": "schema:TradeAction"},
        "TraditionalChinese": {"@id": "schema:TraditionalChinese"},
        "TrainReservation": {"@id": "schema:TrainReservation"},
        "TrainStation": {"@id": "schema:TrainStation"},
        "TrainTrip": {"@id": "schema:TrainTrip"},
        "TransferAction": {"@id": "schema:TransferAction"},
        "TransitMap": {"@id": "schema:TransitMap"},
        "TravelAction": {"@id": "schema:TravelAction"},
        "TravelAgency": {"@id": "schema:TravelAgency"},
        "TreatmentIndication": {"@id": "schema:TreatmentIndication"},
        "TreatmentsHealthAspect": {"@id": "schema:TreatmentsHealthAspect"},
        "Trip": {"@id": "schema:Trip"},
        "TripleBlindedTrial": {"@id": "schema:TripleBlindedTrial"},
        "True": {"@id": "schema:True"},
        "Tuesday": {"@id": "schema:Tuesday"},
        "TypeAndQuantityNode": {"@id": "schema:TypeAndQuantityNode"},
        "TypesHealthAspect": {"@id": "schema:TypesHealthAspect"},
        "UKNonprofitType": {"@id": "schema:UKNonprofitType"},
        "UKTrust": {"@id": "schema:UKTrust"},
        "URL": {"@id": "schema:URL"},
        "USNonprofitType": {"@id": "schema:USNonprofitType"},
        "Ultrasound": {"@id": "schema:Ultrasound"},
        "UnRegisterAction": {"@id": "schema:UnRegisterAction"},
        "UnemploymentSupport": {"@id": "schema:UnemploymentSupport"},
        "UnincorporatedAssociationCharity": {"@id": "schema:UnincorporatedAssociationCharity"},
        "UnitPriceSpecification": {"@id": "schema:UnitPriceSpecification"},
        "UnofficialLegalValue": {"@id": "schema:UnofficialLegalValue"},
        "UpdateAction": {"@id": "schema:UpdateAction"},
        "Urologic": {"@id": "schema:Urologic"},
        "UsageOrScheduleHealthAspect": {"@id": "schema:UsageOrScheduleHealthAspect"},
        "UseAction": {"@id": "schema:UseAction"},
        "UsedCondition": {"@id": "schema:UsedCondition"},
        "UserBlocks": {"@id": "schema:UserBlocks"},
        "UserCheckins": {"@id": "schema:UserCheckins"},
        "UserComments": {"@id": "schema:UserComments"},
        "UserDownloads": {"@id": "schema:UserDownloads"},
        "UserInteraction": {"@id": "schema:UserInteraction"},
        "UserLikes": {"@id": "schema:UserLikes"},
        "UserPageVisits": {"@id": "schema:UserPageVisits"},
        "UserPlays": {"@id": "schema:UserPlays"},
        "UserPlusOnes": {"@id": "schema:UserPlusOnes"},
        "UserReview": {"@id": "schema:UserReview"},
        "UserTweets": {"@id": "schema:UserTweets"},
        "VeganDiet": {"@id": "schema:VeganDiet"},
        "VegetarianDiet": {"@id": "schema:VegetarianDiet"},
        "Vehicle": {"@id": "schema:Vehicle"},
        "Vein": {"@id": "schema:Vein"},
        "VenueMap": {"@id": "schema:VenueMap"},
        "Vessel": {"@id": "schema:Vessel"},
        "VeterinaryCare": {"@id": "schema:VeterinaryCare"},
        "VideoGallery": {"@id": "schema:VideoGallery"},
        "VideoGame": {"@id": "schema:VideoGame"},
        "VideoGameClip": {"@id": "schema:VideoGameClip"},
        "VideoGameSeries": {"@id": "schema:VideoGameSeries"},
        "VideoObject": {"@id": "schema:VideoObject"},
        "ViewAction": {"@id": "schema:ViewAction"},
        "VinylFormat": {"@id": "schema:VinylFormat"},
        "VirtualLocation": {"@id": "schema:VirtualLocation"},
        "Virus": {"@id": "schema:Virus"},
        "VisualArtsEvent": {"@id": "schema:VisualArtsEvent"},
        "VisualArtwork": {"@id": "schema:VisualArtwork"},
        "VitalSign": {"@id": "schema:VitalSign"},
        "Volcano": {"@id": "schema:Volcano"},
        "VoteAction": {"@id": "schema:VoteAction"},
        "WPAdBlock": {"@id": "schema:WPAdBlock"},
        "WPFooter": {"@id": "schema:WPFooter"},
        "WPHeader": {"@id": "schema:WPHeader"},
        "WPSideBar": {"@id": "schema:WPSideBar"},
        "WantAction": {"@id": "schema:WantAction"},
        "WarrantyPromise": {"@id": "schema:WarrantyPromise"},
        "WarrantyScope": {"@id": "schema:WarrantyScope"},
        "WatchAction": {"@id": "schema:WatchAction"},
        "Waterfall": {"@id": "schema:Waterfall"},
        "WearAction": {"@id": "schema:WearAction"},
        "WebAPI": {"@id": "schema:WebAPI"},
        "WebApplication": {"@id": "schema:WebApplication"},
        "WebContent": {"@id": "schema:WebContent"},
        "WebPage": {"@id": "schema:WebPage"},
        "WebPageElement": {"@id": "schema:WebPageElement"},
        "WebSite": {"@id": "schema:WebSite"},
        "Wednesday": {"@id": "schema:Wednesday"},
        "WesternConventional": {"@id": "schema:WesternConventional"},
        "Wholesale": {"@id": "schema:Wholesale"},
        "WholesaleStore": {"@id": "schema:WholesaleStore"},
        "WinAction": {"@id": "schema:WinAction"},
        "Winery": {"@id": "schema:Winery"},
        "Withdrawn": {"@id": "schema:Withdrawn"},
        "WorkBasedProgram": {"@id": "schema:WorkBasedProgram"},
        "WorkersUnion": {"@id": "schema:WorkersUnion"},
        "WriteAction": {"@id": "schema:WriteAction"},
        "WritePermission": {"@id": "schema:WritePermission"},
        "XPathType": {"@id": "schema:XPathType"},
        "XRay": {"@id": "schema:XRay"},
        "ZoneBoardingPolicy": {"@id": "schema:ZoneBoardingPolicy"},
        "Zoo": {"@id": "schema:Zoo"},
        "about": { "@id": "schema:about"},
        "abridged": { "@id": "schema:abridged"},
        "abstract": { "@id": "schema:abstract"},
        "accelerationTime": { "@id": "schema:accelerationTime"},
        "acceptedAnswer": { "@id": "schema:acceptedAnswer"},
        "acceptedOffer": { "@id": "schema:acceptedOffer"},
        "acceptedPaymentMethod": { "@id": "schema:acceptedPaymentMethod"},
        "acceptsReservations": { "@id": "schema:acceptsReservations"},
        "accessCode": { "@id": "schema:accessCode"},
        "accessMode": { "@id": "schema:accessMode"},
        "accessModeSufficient": { "@id": "schema:accessModeSufficient"},
        "accessibilityAPI": { "@id": "schema:accessibilityAPI"},
        "accessibilityControl": { "@id": "schema:accessibilityControl"},
        "accessibilityFeature": { "@id": "schema:accessibilityFeature"},
        "accessibilityHazard": { "@id": "schema:accessibilityHazard"},
        "accessibilitySummary": { "@id": "schema:accessibilitySummary"},
        "accommodationCategory": { "@id": "schema:accommodationCategory"},
        "accommodationFloorPlan": { "@id": "schema:accommodationFloorPlan"},
        "accountId": { "@id": "schema:accountId"},
        "accountMinimumInflow": { "@id": "schema:accountMinimumInflow"},
        "accountOverdraftLimit": { "@id": "schema:accountOverdraftLimit"},
        "accountablePerson": { "@id": "schema:accountablePerson"},
        "acquireLicensePage": { "@id": "schema:acquireLicensePage", "@type": "@id"},
        "acquiredFrom": { "@id": "schema:acquiredFrom"},
        "acrissCode": { "@id": "schema:acrissCode"},
        "actionAccessibilityRequirement": { "@id": "schema:actionAccessibilityRequirement"},
        "actionApplication": { "@id": "schema:actionApplication"},
        "actionOption": { "@id": "schema:actionOption"},
        "actionPlatform": { "@id": "schema:actionPlatform"},
        "actionStatus": { "@id": "schema:actionStatus"},
        "actionableFeedbackPolicy": { "@id": "schema:actionableFeedbackPolicy", "@type": "@id"},
        "activeIngredient": { "@id": "schema:activeIngredient"},
        "activityDuration": { "@id": "schema:activityDuration"},
        "activityFrequency": { "@id": "schema:activityFrequency"},
        "actor": { "@id": "schema:actor"},
        "actors": { "@id": "schema:actors"},
        "addOn": { "@id": "schema:addOn"},
        "additionalName": { "@id": "schema:additionalName"},
        "additionalNumberOfGuests": { "@id": "schema:additionalNumberOfGuests"},
        "additionalProperty": { "@id": "schema:additionalProperty"},
        "additionalType": { "@id": "schema:additionalType", "@type": "@id"},
        "additionalVariable": { "@id": "schema:additionalVariable"},
        "address": { "@id": "schema:address"},
        "addressCountry": { "@id": "schema:addressCountry"},
        "addressLocality": { "@id": "schema:addressLocality"},
        "addressRegion": { "@id": "schema:addressRegion"},
        "administrationRoute": { "@id": "schema:administrationRoute"},
        "advanceBookingRequirement": { "@id": "schema:advanceBookingRequirement"},
        "adverseOutcome": { "@id": "schema:adverseOutcome"},
        "affectedBy": { "@id": "schema:affectedBy"},
        "affiliation": { "@id": "schema:affiliation"},
        "afterMedia": { "@id": "schema:afterMedia", "@type": "@id"},
        "agent": { "@id": "schema:agent"},
        "aggregateRating": { "@id": "schema:aggregateRating"},
        "aircraft": { "@id": "schema:aircraft"},
        "album": { "@id": "schema:album"},
        "albumProductionType": { "@id": "schema:albumProductionType"},
        "albumRelease": { "@id": "schema:albumRelease"},
        "albumReleaseType": { "@id": "schema:albumReleaseType"},
        "albums": { "@id": "schema:albums"},
        "alcoholWarning": { "@id": "schema:alcoholWarning"},
        "algorithm": { "@id": "schema:algorithm"},
        "alignmentType": { "@id": "schema:alignmentType"},
        "alternateName": { "@id": "schema:alternateName"},
        "alternativeHeadline": { "@id": "schema:alternativeHeadline"},
        "alumni": { "@id": "schema:alumni"},
        "alumniOf": { "@id": "schema:alumniOf"},
        "amenityFeature": { "@id": "schema:amenityFeature"},
        "amount": { "@id": "schema:amount"},
        "amountOfThisGood": { "@id": "schema:amountOfThisGood"},
        "announcementLocation": { "@id": "schema:announcementLocation"},
        "annualPercentageRate": { "@id": "schema:annualPercentageRate"},
        "answerCount": { "@id": "schema:answerCount"},
        "antagonist": { "@id": "schema:antagonist"},
        "appearance": { "@id": "schema:appearance"},
        "applicableLocation": { "@id": "schema:applicableLocation"},
        "applicantLocationRequirements": { "@id": "schema:applicantLocationRequirements"},
        "application": { "@id": "schema:application"},
        "applicationCategory": { "@id": "schema:applicationCategory"},
        "applicationContact": { "@id": "schema:applicationContact"},
        "applicationDeadline": { "@id": "schema:applicationDeadline", "@type": "Date"},
        "applicationStartDate": { "@id": "schema:applicationStartDate", "@type": "Date"},
        "applicationSubCategory": { "@id": "schema:applicationSubCategory"},
        "applicationSuite": { "@id": "schema:applicationSuite"},
        "appliesToDeliveryMethod": { "@id": "schema:appliesToDeliveryMethod"},
        "appliesToPaymentMethod": { "@id": "schema:appliesToPaymentMethod"},
        "archiveHeld": { "@id": "schema:archiveHeld"},
        "area": { "@id": "schema:area"},
        "areaServed": { "@id": "schema:areaServed"},
        "arrivalAirport": { "@id": "schema:arrivalAirport"},
        "arrivalBusStop": { "@id": "schema:arrivalBusStop"},
        "arrivalGate": { "@id": "schema:arrivalGate"},
        "arrivalPlatform": { "@id": "schema:arrivalPlatform"},
        "arrivalStation": { "@id": "schema:arrivalStation"},
        "arrivalTerminal": { "@id": "schema:arrivalTerminal"},
        "arrivalTime": { "@id": "schema:arrivalTime", "@type": "DateTime"},
        "artEdition": { "@id": "schema:artEdition"},
        "artMedium": { "@id": "schema:artMedium"},
        "arterialBranch": { "@id": "schema:arterialBranch"},
        "artform": { "@id": "schema:artform"},
        "articleBody": { "@id": "schema:articleBody"},
        "articleSection": { "@id": "schema:articleSection"},
        "artist": { "@id": "schema:artist"},
        "artworkSurface": { "@id": "schema:artworkSurface"},
        "aspect": { "@id": "schema:aspect"},
        "assembly": { "@id": "schema:assembly"},
        "assemblyVersion": { "@id": "schema:assemblyVersion"},
        "assesses": { "@id": "schema:assesses"},
        "associatedAnatomy": { "@id": "schema:associatedAnatomy"},
        "associatedArticle": { "@id": "schema:associatedArticle"},
        "associatedMedia": { "@id": "schema:associatedMedia"},
        "associatedPathophysiology": { "@id": "schema:associatedPathophysiology"},
        "athlete": { "@id": "schema:athlete"},
        "attendee": { "@id": "schema:attendee"},
        "attendees": { "@id": "schema:attendees"},
        "audience": { "@id": "schema:audience"},
        "audienceType": { "@id": "schema:audienceType"},
        "audio": { "@id": "schema:audio"},
        "authenticator": { "@id": "schema:authenticator"},
        "author": { "@id": "schema:author"},
        "availability": { "@id": "schema:availability"},
        "availabilityEnds": { "@id": "schema:availabilityEnds", "@type": "Date"},
        "availabilityStarts": { "@id": "schema:availabilityStarts", "@type": "Date"},
        "availableAtOrFrom": { "@id": "schema:availableAtOrFrom"},
        "availableChannel": { "@id": "schema:availableChannel"},
        "availableDeliveryMethod": { "@id": "schema:availableDeliveryMethod"},
        "availableFrom": { "@id": "schema:availableFrom", "@type": "DateTime"},
        "availableIn": { "@id": "schema:availableIn"},
        "availableLanguage": { "@id": "schema:availableLanguage"},
        "availableOnDevice": { "@id": "schema:availableOnDevice"},
        "availableService": { "@id": "schema:availableService"},
        "availableStrength": { "@id": "schema:availableStrength"},
        "availableTest": { "@id": "schema:availableTest"},
        "availableThrough": { "@id": "schema:availableThrough", "@type": "DateTime"},
        "award": { "@id": "schema:award"},
        "awards": { "@id": "schema:awards"},
        "awayTeam": { "@id": "schema:awayTeam"},
        "backstory": { "@id": "schema:backstory"},
        "bankAccountType": { "@id": "schema:bankAccountType"},
        "baseSalary": { "@id": "schema:baseSalary"},
        "bccRecipient": { "@id": "schema:bccRecipient"},
        "bed": { "@id": "schema:bed"},
        "beforeMedia": { "@id": "schema:beforeMedia", "@type": "@id"},
        "beneficiaryBank": { "@id": "schema:beneficiaryBank"},
        "benefits": { "@id": "schema:benefits"},
        "benefitsSummaryUrl": { "@id": "schema:benefitsSummaryUrl", "@type": "@id"},
        "bestRating": { "@id": "schema:bestRating"},
        "billingAddress": { "@id": "schema:billingAddress"},
        "billingIncrement": { "@id": "schema:billingIncrement"},
        "billingPeriod": { "@id": "schema:billingPeriod"},
        "biomechnicalClass": { "@id": "schema:biomechnicalClass"},
        "birthDate": { "@id": "schema:birthDate", "@type": "Date"},
        "birthPlace": { "@id": "schema:birthPlace"},
        "bitrate": { "@id": "schema:bitrate"},
        "blogPost": { "@id": "schema:blogPost"},
        "blogPosts": { "@id": "schema:blogPosts"},
        "bloodSupply": { "@id": "schema:bloodSupply"},
        "boardingGroup": { "@id": "schema:boardingGroup"},
        "boardingPolicy": { "@id": "schema:boardingPolicy"},
        "bodyLocation": { "@id": "schema:bodyLocation"},
        "bodyType": { "@id": "schema:bodyType"},
        "bookEdition": { "@id": "schema:bookEdition"},
        "bookFormat": { "@id": "schema:bookFormat"},
        "bookingAgent": { "@id": "schema:bookingAgent"},
        "bookingTime": { "@id": "schema:bookingTime", "@type": "DateTime"},
        "borrower": { "@id": "schema:borrower"},
        "box": { "@id": "schema:box"},
        "branch": { "@id": "schema:branch"},
        "branchCode": { "@id": "schema:branchCode"},
        "branchOf": { "@id": "schema:branchOf"},
        "brand": { "@id": "schema:brand"},
        "breadcrumb": { "@id": "schema:breadcrumb"},
        "breastfeedingWarning": { "@id": "schema:breastfeedingWarning"},
        "broadcastAffiliateOf": { "@id": "schema:broadcastAffiliateOf"},
        "broadcastChannelId": { "@id": "schema:broadcastChannelId"},
        "broadcastDisplayName": { "@id": "schema:broadcastDisplayName"},
        "broadcastFrequency": { "@id": "schema:broadcastFrequency"},
        "broadcastFrequencyValue": { "@id": "schema:broadcastFrequencyValue"},
        "broadcastOfEvent": { "@id": "schema:broadcastOfEvent"},
        "broadcastServiceTier": { "@id": "schema:broadcastServiceTier"},
        "broadcastSignalModulation": { "@id": "schema:broadcastSignalModulation"},
        "broadcastSubChannel": { "@id": "schema:broadcastSubChannel"},
        "broadcastTimezone": { "@id": "schema:broadcastTimezone"},
        "broadcaster": { "@id": "schema:broadcaster"},
        "broker": { "@id": "schema:broker"},
        "browserRequirements": { "@id": "schema:browserRequirements"},
        "busName": { "@id": "schema:busName"},
        "busNumber": { "@id": "schema:busNumber"},
        "businessDays": { "@id": "schema:businessDays"},
        "businessFunction": { "@id": "schema:businessFunction"},
        "buyer": { "@id": "schema:buyer"},
        "byArtist": { "@id": "schema:byArtist"},
        "byDay": { "@id": "schema:byDay"},
        "byMonth": { "@id": "schema:byMonth"},
        "byMonthDay": { "@id": "schema:byMonthDay"},
        "callSign": { "@id": "schema:callSign"},
        "calories": { "@id": "schema:calories"},
        "candidate": { "@id": "schema:candidate"},
        "caption": { "@id": "schema:caption"},
        "carbohydrateContent": { "@id": "schema:carbohydrateContent"},
        "cargoVolume": { "@id": "schema:cargoVolume"},
        "carrier": { "@id": "schema:carrier"},
        "carrierRequirements": { "@id": "schema:carrierRequirements"},
        "cashBack": { "@id": "schema:cashBack"},
        "catalog": { "@id": "schema:catalog"},
        "catalogNumber": { "@id": "schema:catalogNumber"},
        "category": { "@id": "schema:category"},
        "causeOf": { "@id": "schema:causeOf"},
        "ccRecipient": { "@id": "schema:ccRecipient"},
        "character": { "@id": "schema:character"},
        "characterAttribute": { "@id": "schema:characterAttribute"},
        "characterName": { "@id": "schema:characterName"},
        "cheatCode": { "@id": "schema:cheatCode"},
        "checkinTime": { "@id": "schema:checkinTime", "@type": "DateTime"},
        "checkoutTime": { "@id": "schema:checkoutTime", "@type": "DateTime"},
        "childMaxAge": { "@id": "schema:childMaxAge"},
        "childMinAge": { "@id": "schema:childMinAge"},
        "children": { "@id": "schema:children"},
        "cholesterolContent": { "@id": "schema:cholesterolContent"},
        "circle": { "@id": "schema:circle"},
        "citation": { "@id": "schema:citation"},
        "claimReviewed": { "@id": "schema:claimReviewed"},
        "clincalPharmacology": { "@id": "schema:clincalPharmacology"},
        "clinicalPharmacology": { "@id": "schema:clinicalPharmacology"},
        "clipNumber": { "@id": "schema:clipNumber"},
        "closes": { "@id": "schema:closes"},
        "coach": { "@id": "schema:coach"},
        "code": { "@id": "schema:code"},
        "codeRepository": { "@id": "schema:codeRepository", "@type": "@id"},
        "codeSampleType": { "@id": "schema:codeSampleType"},
        "codeValue": { "@id": "schema:codeValue"},
        "codingSystem": { "@id": "schema:codingSystem"},
        "colleague": { "@id": "schema:colleague", "@type": "@id"},
        "colleagues": { "@id": "schema:colleagues"},
        "collection": { "@id": "schema:collection"},
        "collectionSize": { "@id": "schema:collectionSize"},
        "color": { "@id": "schema:color"},
        "colorist": { "@id": "schema:colorist"},
        "comment": { "@id": "schema:comment"},
        "commentCount": { "@id": "schema:commentCount"},
        "commentText": { "@id": "schema:commentText"},
        "commentTime": { "@id": "schema:commentTime", "@type": "Date"},
        "competencyRequired": { "@id": "schema:competencyRequired"},
        "competitor": { "@id": "schema:competitor"},
        "composer": { "@id": "schema:composer"},
        "comprisedOf": { "@id": "schema:comprisedOf"},
        "conditionsOfAccess": { "@id": "schema:conditionsOfAccess"},
        "confirmationNumber": { "@id": "schema:confirmationNumber"},
        "connectedTo": { "@id": "schema:connectedTo"},
        "constrainingProperty": { "@id": "schema:constrainingProperty"},
        "contactOption": { "@id": "schema:contactOption"},
        "contactPoint": { "@id": "schema:contactPoint"},
        "contactPoints": { "@id": "schema:contactPoints"},
        "contactType": { "@id": "schema:contactType"},
        "contactlessPayment": { "@id": "schema:contactlessPayment"},
        "containedIn": { "@id": "schema:containedIn"},
        "containedInPlace": { "@id": "schema:containedInPlace"},
        "containsPlace": { "@id": "schema:containsPlace"},
        "containsSeason": { "@id": "schema:containsSeason"},
        "contentLocation": { "@id": "schema:contentLocation"},
        "contentRating": { "@id": "schema:contentRating"},
        "contentReferenceTime": { "@id": "schema:contentReferenceTime", "@type": "DateTime"},
        "contentSize": { "@id": "schema:contentSize"},
        "contentType": { "@id": "schema:contentType"},
        "contentUrl": { "@id": "schema:contentUrl", "@type": "@id"},
        "contraindication": { "@id": "schema:contraindication"},
        "contributor": { "@id": "schema:contributor"},
        "cookTime": { "@id": "schema:cookTime"},
        "cookingMethod": { "@id": "schema:cookingMethod"},
        "copyrightHolder": { "@id": "schema:copyrightHolder"},
        "copyrightYear": { "@id": "schema:copyrightYear"},
        "correction": { "@id": "schema:correction"},
        "correctionsPolicy": { "@id": "schema:correctionsPolicy", "@type": "@id"},
        "costCategory": { "@id": "schema:costCategory"},
        "costCurrency": { "@id": "schema:costCurrency"},
        "costOrigin": { "@id": "schema:costOrigin"},
        "costPerUnit": { "@id": "schema:costPerUnit"},
        "countriesNotSupported": { "@id": "schema:countriesNotSupported"},
        "countriesSupported": { "@id": "schema:countriesSupported"},
        "countryOfOrigin": { "@id": "schema:countryOfOrigin"},
        "course": { "@id": "schema:course"},
        "courseCode": { "@id": "schema:courseCode"},
        "courseMode": { "@id": "schema:courseMode"},
        "coursePrerequisites": { "@id": "schema:coursePrerequisites"},
        "courseWorkload": { "@id": "schema:courseWorkload"},
        "coverageEndTime": { "@id": "schema:coverageEndTime", "@type": "DateTime"},
        "coverageStartTime": { "@id": "schema:coverageStartTime", "@type": "DateTime"},
        "creativeWorkStatus": { "@id": "schema:creativeWorkStatus"},
        "creator": { "@id": "schema:creator"},
        "credentialCategory": { "@id": "schema:credentialCategory"},
        "creditedTo": { "@id": "schema:creditedTo"},
        "cssSelector": { "@id": "schema:cssSelector"},
        "currenciesAccepted": { "@id": "schema:currenciesAccepted"},
        "currency": { "@id": "schema:currency"},
        "currentExchangeRate": { "@id": "schema:currentExchangeRate"},
        "customer": { "@id": "schema:customer"},
        "cutoffTime": { "@id": "schema:cutoffTime"},
        "cvdCollectionDate": { "@id": "schema:cvdCollectionDate"},
        "cvdFacilityCounty": { "@id": "schema:cvdFacilityCounty"},
        "cvdFacilityId": { "@id": "schema:cvdFacilityId"},
        "cvdNumBeds": { "@id": "schema:cvdNumBeds"},
        "cvdNumBedsOcc": { "@id": "schema:cvdNumBedsOcc"},
        "cvdNumC19Died": { "@id": "schema:cvdNumC19Died"},
        "cvdNumC19HOPats": { "@id": "schema:cvdNumC19HOPats"},
        "cvdNumC19HospPats": { "@id": "schema:cvdNumC19HospPats"},
        "cvdNumC19MechVentPats": { "@id": "schema:cvdNumC19MechVentPats"},
        "cvdNumC19OFMechVentPats": { "@id": "schema:cvdNumC19OFMechVentPats"},
        "cvdNumC19OverflowPats": { "@id": "schema:cvdNumC19OverflowPats"},
        "cvdNumICUBeds": { "@id": "schema:cvdNumICUBeds"},
        "cvdNumICUBedsOcc": { "@id": "schema:cvdNumICUBedsOcc"},
        "cvdNumTotBeds": { "@id": "schema:cvdNumTotBeds"},
        "cvdNumVent": { "@id": "schema:cvdNumVent"},
        "cvdNumVentUse": { "@id": "schema:cvdNumVentUse"},
        "dataFeedElement": { "@id": "schema:dataFeedElement"},
        "dataset": { "@id": "schema:dataset"},
        "datasetTimeInterval": { "@id": "schema:datasetTimeInterval", "@type": "DateTime"},
        "dateCreated": { "@id": "schema:dateCreated", "@type": "Date"},
        "dateDeleted": { "@id": "schema:dateDeleted", "@type": "Date"},
        "dateIssued": { "@id": "schema:dateIssued", "@type": "Date"},
        "dateModified": { "@id": "schema:dateModified", "@type": "Date"},
        "datePosted": { "@id": "schema:datePosted", "@type": "Date"},
        "datePublished": { "@id": "schema:datePublished", "@type": "Date"},
        "dateRead": { "@id": "schema:dateRead", "@type": "Date"},
        "dateReceived": { "@id": "schema:dateReceived", "@type": "DateTime"},
        "dateSent": { "@id": "schema:dateSent", "@type": "DateTime"},
        "dateVehicleFirstRegistered": { "@id": "schema:dateVehicleFirstRegistered", "@type": "Date"},
        "dateline": { "@id": "schema:dateline"},
        "dayOfWeek": { "@id": "schema:dayOfWeek"},
        "deathDate": { "@id": "schema:deathDate", "@type": "Date"},
        "deathPlace": { "@id": "schema:deathPlace"},
        "defaultValue": { "@id": "schema:defaultValue"},
        "deliveryAddress": { "@id": "schema:deliveryAddress"},
        "deliveryLeadTime": { "@id": "schema:deliveryLeadTime"},
        "deliveryMethod": { "@id": "schema:deliveryMethod"},
        "deliveryStatus": { "@id": "schema:deliveryStatus"},
        "deliveryTime": { "@id": "schema:deliveryTime"},
        "department": { "@id": "schema:department"},
        "departureAirport": { "@id": "schema:departureAirport"},
        "departureBusStop": { "@id": "schema:departureBusStop"},
        "departureGate": { "@id": "schema:departureGate"},
        "departurePlatform": { "@id": "schema:departurePlatform"},
        "departureStation": { "@id": "schema:departureStation"},
        "departureTerminal": { "@id": "schema:departureTerminal"},
        "departureTime": { "@id": "schema:departureTime", "@type": "DateTime"},
        "dependencies": { "@id": "schema:dependencies"},
        "depth": { "@id": "schema:depth"},
        "description": { "@id": "schema:description"},
        "device": { "@id": "schema:device"},
        "diagnosis": { "@id": "schema:diagnosis"},
        "diagram": { "@id": "schema:diagram"},
        "diet": { "@id": "schema:diet"},
        "dietFeatures": { "@id": "schema:dietFeatures"},
        "differentialDiagnosis": { "@id": "schema:differentialDiagnosis"},
        "director": { "@id": "schema:director"},
        "directors": { "@id": "schema:directors"},
        "disambiguatingDescription": { "@id": "schema:disambiguatingDescription"},
        "discount": { "@id": "schema:discount"},
        "discountCode": { "@id": "schema:discountCode"},
        "discountCurrency": { "@id": "schema:discountCurrency"},
        "discusses": { "@id": "schema:discusses"},
        "discussionUrl": { "@id": "schema:discussionUrl", "@type": "@id"},
        "diseasePreventionInfo": { "@id": "schema:diseasePreventionInfo", "@type": "@id"},
        "diseaseSpreadStatistics": { "@id": "schema:diseaseSpreadStatistics", "@type": "@id"},
        "dissolutionDate": { "@id": "schema:dissolutionDate", "@type": "Date"},
        "distance": { "@id": "schema:distance"},
        "distinguishingSign": { "@id": "schema:distinguishingSign"},
        "distribution": { "@id": "schema:distribution"},
        "diversityPolicy": { "@id": "schema:diversityPolicy", "@type": "@id"},
        "diversityStaffingReport": { "@id": "schema:diversityStaffingReport", "@type": "@id"},
        "documentation": { "@id": "schema:documentation", "@type": "@id"},
        "doesNotShip": { "@id": "schema:doesNotShip"},
        "domainIncludes": { "@id": "schema:domainIncludes"},
        "domiciledMortgage": { "@id": "schema:domiciledMortgage"},
        "doorTime": { "@id": "schema:doorTime", "@type": "DateTime"},
        "dosageForm": { "@id": "schema:dosageForm"},
        "doseSchedule": { "@id": "schema:doseSchedule"},
        "doseUnit": { "@id": "schema:doseUnit"},
        "doseValue": { "@id": "schema:doseValue"},
        "downPayment": { "@id": "schema:downPayment"},
        "downloadUrl": { "@id": "schema:downloadUrl", "@type": "@id"},
        "downvoteCount": { "@id": "schema:downvoteCount"},
        "drainsTo": { "@id": "schema:drainsTo"},
        "driveWheelConfiguration": { "@id": "schema:driveWheelConfiguration"},
        "dropoffLocation": { "@id": "schema:dropoffLocation"},
        "dropoffTime": { "@id": "schema:dropoffTime", "@type": "DateTime"},
        "drug": { "@id": "schema:drug"},
        "drugClass": { "@id": "schema:drugClass"},
        "drugUnit": { "@id": "schema:drugUnit"},
        "duns": { "@id": "schema:duns"},
        "duplicateTherapy": { "@id": "schema:duplicateTherapy"},
        "duration": { "@id": "schema:duration"},
        "durationOfWarranty": { "@id": "schema:durationOfWarranty"},
        "duringMedia": { "@id": "schema:duringMedia", "@type": "@id"},
        "earlyPrepaymentPenalty": { "@id": "schema:earlyPrepaymentPenalty"},
        "editEIDR": { "@id": "schema:editEIDR"},
        "editor": { "@id": "schema:editor"},
        "educationRequirements": { "@id": "schema:educationRequirements"},
        "educationalAlignment": { "@id": "schema:educationalAlignment"},
        "educationalCredentialAwarded": { "@id": "schema:educationalCredentialAwarded"},
        "educationalFramework": { "@id": "schema:educationalFramework"},
        "educationalLevel": { "@id": "schema:educationalLevel"},
        "educationalProgramMode": { "@id": "schema:educationalProgramMode"},
        "educationalRole": { "@id": "schema:educationalRole"},
        "educationalUse": { "@id": "schema:educationalUse"},
        "elevation": { "@id": "schema:elevation"},
        "eligibilityToWorkRequirement": { "@id": "schema:eligibilityToWorkRequirement"},
        "eligibleCustomerType": { "@id": "schema:eligibleCustomerType"},
        "eligibleDuration": { "@id": "schema:eligibleDuration"},
        "eligibleQuantity": { "@id": "schema:eligibleQuantity"},
        "eligibleRegion": { "@id": "schema:eligibleRegion"},
        "eligibleTransactionVolume": { "@id": "schema:eligibleTransactionVolume"},
        "email": { "@id": "schema:email"},
        "embedUrl": { "@id": "schema:embedUrl", "@type": "@id"},
        "emissionsCO2": { "@id": "schema:emissionsCO2"},
        "employee": { "@id": "schema:employee"},
        "employees": { "@id": "schema:employees"},
        "employerOverview": { "@id": "schema:employerOverview"},
        "employmentType": { "@id": "schema:employmentType"},
        "employmentUnit": { "@id": "schema:employmentUnit"},
        "encodesCreativeWork": { "@id": "schema:encodesCreativeWork"},
        "encoding": { "@id": "schema:encoding"},
        "encodingFormat": { "@id": "schema:encodingFormat"},
        "encodingType": { "@id": "schema:encodingType"},
        "encodings": { "@id": "schema:encodings"},
        "endDate": { "@id": "schema:endDate", "@type": "Date"},
        "endOffset": { "@id": "schema:endOffset"},
        "endTime": { "@id": "schema:endTime", "@type": "DateTime"},
        "endorsee": { "@id": "schema:endorsee"},
        "endorsers": { "@id": "schema:endorsers"},
        "engineDisplacement": { "@id": "schema:engineDisplacement"},
        "enginePower": { "@id": "schema:enginePower"},
        "engineType": { "@id": "schema:engineType"},
        "entertainmentBusiness": { "@id": "schema:entertainmentBusiness"},
        "epidemiology": { "@id": "schema:epidemiology"},
        "episode": { "@id": "schema:episode"},
        "episodeNumber": { "@id": "schema:episodeNumber"},
        "episodes": { "@id": "schema:episodes"},
        "equal": { "@id": "schema:equal"},
        "error": { "@id": "schema:error"},
        "estimatedCost": { "@id": "schema:estimatedCost"},
        "estimatedFlightDuration": { "@id": "schema:estimatedFlightDuration"},
        "estimatedSalary": { "@id": "schema:estimatedSalary"},
        "estimatesRiskOf": { "@id": "schema:estimatesRiskOf"},
        "ethicsPolicy": { "@id": "schema:ethicsPolicy", "@type": "@id"},
        "event": { "@id": "schema:event"},
        "eventAttendanceMode": { "@id": "schema:eventAttendanceMode"},
        "eventSchedule": { "@id": "schema:eventSchedule"},
        "eventStatus": { "@id": "schema:eventStatus"},
        "events": { "@id": "schema:events"},
        "evidenceLevel": { "@id": "schema:evidenceLevel"},
        "evidenceOrigin": { "@id": "schema:evidenceOrigin"},
        "exampleOfWork": { "@id": "schema:exampleOfWork"},
        "exceptDate": { "@id": "schema:exceptDate", "@type": "Date"},
        "exchangeRateSpread": { "@id": "schema:exchangeRateSpread"},
        "executableLibraryName": { "@id": "schema:executableLibraryName"},
        "exerciseCourse": { "@id": "schema:exerciseCourse"},
        "exercisePlan": { "@id": "schema:exercisePlan"},
        "exerciseRelatedDiet": { "@id": "schema:exerciseRelatedDiet"},
        "exerciseType": { "@id": "schema:exerciseType"},
        "exifData": { "@id": "schema:exifData"},
        "expectedArrivalFrom": { "@id": "schema:expectedArrivalFrom", "@type": "Date"},
        "expectedArrivalUntil": { "@id": "schema:expectedArrivalUntil", "@type": "Date"},
        "expectedPrognosis": { "@id": "schema:expectedPrognosis"},
        "expectsAcceptanceOf": { "@id": "schema:expectsAcceptanceOf"},
        "experienceRequirements": { "@id": "schema:experienceRequirements"},
        "expertConsiderations": { "@id": "schema:expertConsiderations"},
        "expires": { "@id": "schema:expires", "@type": "Date"},
        "familyName": { "@id": "schema:familyName"},
        "fatContent": { "@id": "schema:fatContent"},
        "faxNumber": { "@id": "schema:faxNumber"},
        "featureList": { "@id": "schema:featureList"},
        "feesAndCommissionsSpecification": { "@id": "schema:feesAndCommissionsSpecification"},
        "fiberContent": { "@id": "schema:fiberContent"},
        "fileFormat": { "@id": "schema:fileFormat"},
        "fileSize": { "@id": "schema:fileSize"},
        "financialAidEligible": { "@id": "schema:financialAidEligible"},
        "firstAppearance": { "@id": "schema:firstAppearance"},
        "firstPerformance": { "@id": "schema:firstPerformance"},
        "flightDistance": { "@id": "schema:flightDistance"},
        "flightNumber": { "@id": "schema:flightNumber"},
        "floorLevel": { "@id": "schema:floorLevel"},
        "floorLimit": { "@id": "schema:floorLimit"},
        "floorSize": { "@id": "schema:floorSize"},
        "followee": { "@id": "schema:followee"},
        "follows": { "@id": "schema:follows"},
        "followup": { "@id": "schema:followup"},
        "foodEstablishment": { "@id": "schema:foodEstablishment"},
        "foodEvent": { "@id": "schema:foodEvent"},
        "foodWarning": { "@id": "schema:foodWarning"},
        "founder": { "@id": "schema:founder"},
        "founders": { "@id": "schema:founders"},
        "foundingDate": { "@id": "schema:foundingDate", "@type": "Date"},
        "foundingLocation": { "@id": "schema:foundingLocation"},
        "free": { "@id": "schema:free"},
        "freeShippingThreshold": { "@id": "schema:freeShippingThreshold"},
        "frequency": { "@id": "schema:frequency"},
        "fromLocation": { "@id": "schema:fromLocation"},
        "fuelCapacity": { "@id": "schema:fuelCapacity"},
        "fuelConsumption": { "@id": "schema:fuelConsumption"},
        "fuelEfficiency": { "@id": "schema:fuelEfficiency"},
        "fuelType": { "@id": "schema:fuelType"},
        "functionalClass": { "@id": "schema:functionalClass"},
        "fundedItem": { "@id": "schema:fundedItem"},
        "funder": { "@id": "schema:funder"},
        "game": { "@id": "schema:game"},
        "gameItem": { "@id": "schema:gameItem"},
        "gameLocation": { "@id": "schema:gameLocation", "@type": "@id"},
        "gamePlatform": { "@id": "schema:gamePlatform"},
        "gameServer": { "@id": "schema:gameServer"},
        "gameTip": { "@id": "schema:gameTip"},
        "gender": { "@id": "schema:gender"},
        "genre": { "@id": "schema:genre"},
        "geo": { "@id": "schema:geo"},
        "geoContains": { "@id": "schema:geoContains"},
        "geoCoveredBy": { "@id": "schema:geoCoveredBy"},
        "geoCovers": { "@id": "schema:geoCovers"},
        "geoCrosses": { "@id": "schema:geoCrosses"},
        "geoDisjoint": { "@id": "schema:geoDisjoint"},
        "geoEquals": { "@id": "schema:geoEquals"},
        "geoIntersects": { "@id": "schema:geoIntersects"},
        "geoMidpoint": { "@id": "schema:geoMidpoint"},
        "geoOverlaps": { "@id": "schema:geoOverlaps"},
        "geoRadius": { "@id": "schema:geoRadius"},
        "geoTouches": { "@id": "schema:geoTouches"},
        "geoWithin": { "@id": "schema:geoWithin"},
        "geographicArea": { "@id": "schema:geographicArea"},
        "gettingTestedInfo": { "@id": "schema:gettingTestedInfo", "@type": "@id"},
        "givenName": { "@id": "schema:givenName"},
        "globalLocationNumber": { "@id": "schema:globalLocationNumber"},
        "governmentBenefitsInfo": { "@id": "schema:governmentBenefitsInfo"},
        "gracePeriod": { "@id": "schema:gracePeriod"},
        "grantee": { "@id": "schema:grantee"},
        "greater": { "@id": "schema:greater"},
        "greaterOrEqual": { "@id": "schema:greaterOrEqual"},
        "gtin": { "@id": "schema:gtin"},
        "gtin12": { "@id": "schema:gtin12"},
        "gtin13": { "@id": "schema:gtin13"},
        "gtin14": { "@id": "schema:gtin14"},
        "gtin8": { "@id": "schema:gtin8"},
        "guideline": { "@id": "schema:guideline"},
        "guidelineDate": { "@id": "schema:guidelineDate", "@type": "Date"},
        "guidelineSubject": { "@id": "schema:guidelineSubject"},
        "handlingTime": { "@id": "schema:handlingTime"},
        "hasBroadcastChannel": { "@id": "schema:hasBroadcastChannel"},
        "hasCategoryCode": { "@id": "schema:hasCategoryCode"},
        "hasCourseInstance": { "@id": "schema:hasCourseInstance"},
        "hasCredential": { "@id": "schema:hasCredential"},
        "hasDefinedTerm": { "@id": "schema:hasDefinedTerm"},
        "hasDeliveryMethod": { "@id": "schema:hasDeliveryMethod"},
        "hasDigitalDocumentPermission": { "@id": "schema:hasDigitalDocumentPermission"},
        "hasDriveThroughService": { "@id": "schema:hasDriveThroughService"},
        "hasHealthAspect": { "@id": "schema:hasHealthAspect"},
        "hasMap": { "@id": "schema:hasMap", "@type": "@id"},
        "hasMenu": { "@id": "schema:hasMenu"},
        "hasMenuItem": { "@id": "schema:hasMenuItem"},
        "hasMenuSection": { "@id": "schema:hasMenuSection"},
        "hasMerchantReturnPolicy": { "@id": "schema:hasMerchantReturnPolicy"},
        "hasOccupation": { "@id": "schema:hasOccupation"},
        "hasOfferCatalog": { "@id": "schema:hasOfferCatalog"},
        "hasPOS": { "@id": "schema:hasPOS"},
        "hasPart": { "@id": "schema:hasPart"},
        "hasProductReturnPolicy": { "@id": "schema:hasProductReturnPolicy"},
        "headline": { "@id": "schema:headline"},
        "healthCondition": { "@id": "schema:healthCondition"},
        "healthPlanCoinsuranceOption": { "@id": "schema:healthPlanCoinsuranceOption"},
        "healthPlanCoinsuranceRate": { "@id": "schema:healthPlanCoinsuranceRate"},
        "healthPlanCopay": { "@id": "schema:healthPlanCopay"},
        "healthPlanCopayOption": { "@id": "schema:healthPlanCopayOption"},
        "healthPlanCostSharing": { "@id": "schema:healthPlanCostSharing"},
        "healthPlanDrugOption": { "@id": "schema:healthPlanDrugOption"},
        "healthPlanDrugTier": { "@id": "schema:healthPlanDrugTier"},
        "healthPlanId": { "@id": "schema:healthPlanId"},
        "healthPlanMarketingUrl": { "@id": "schema:healthPlanMarketingUrl", "@type": "@id"},
        "healthPlanNetworkId": { "@id": "schema:healthPlanNetworkId"},
        "healthPlanNetworkTier": { "@id": "schema:healthPlanNetworkTier"},
        "healthPlanPharmacyCategory": { "@id": "schema:healthPlanPharmacyCategory"},
        "healthcareReportingData": { "@id": "schema:healthcareReportingData"},
        "height": { "@id": "schema:height"},
        "highPrice": { "@id": "schema:highPrice"},
        "hiringOrganization": { "@id": "schema:hiringOrganization"},
        "holdingArchive": { "@id": "schema:holdingArchive"},
        "homeLocation": { "@id": "schema:homeLocation"},
        "homeTeam": { "@id": "schema:homeTeam"},
        "honorificPrefix": { "@id": "schema:honorificPrefix"},
        "honorificSuffix": { "@id": "schema:honorificSuffix"},
        "hospitalAffiliation": { "@id": "schema:hospitalAffiliation"},
        "hostingOrganization": { "@id": "schema:hostingOrganization"},
        "hoursAvailable": { "@id": "schema:hoursAvailable"},
        "howPerformed": { "@id": "schema:howPerformed"},
        "iataCode": { "@id": "schema:iataCode"},
        "icaoCode": { "@id": "schema:icaoCode"},
        "identifier": { "@id": "schema:identifier"},
        "identifyingExam": { "@id": "schema:identifyingExam"},
        "identifyingTest": { "@id": "schema:identifyingTest"},
        "illustrator": { "@id": "schema:illustrator"},
        "image": { "@id": "schema:image", "@type": "@id"},
        "imagingTechnique": { "@id": "schema:imagingTechnique"},
        "inAlbum": { "@id": "schema:inAlbum"},
        "inBroadcastLineup": { "@id": "schema:inBroadcastLineup"},
        "inCodeSet": { "@id": "schema:inCodeSet", "@type": "@id"},
        "inDefinedTermSet": { "@id": "schema:inDefinedTermSet", "@type": "@id"},
        "inLanguage": { "@id": "schema:inLanguage"},
        "inPlaylist": { "@id": "schema:inPlaylist"},
        "inStoreReturnsOffered": { "@id": "schema:inStoreReturnsOffered"},
        "inSupportOf": { "@id": "schema:inSupportOf"},
        "incentiveCompensation": { "@id": "schema:incentiveCompensation"},
        "incentives": { "@id": "schema:incentives"},
        "includedComposition": { "@id": "schema:includedComposition"},
        "includedDataCatalog": { "@id": "schema:includedDataCatalog"},
        "includedInDataCatalog": { "@id": "schema:includedInDataCatalog"},
        "includedInHealthInsurancePlan": { "@id": "schema:includedInHealthInsurancePlan"},
        "includedRiskFactor": { "@id": "schema:includedRiskFactor"},
        "includesAttraction": { "@id": "schema:includesAttraction"},
        "includesHealthPlanFormulary": { "@id": "schema:includesHealthPlanFormulary"},
        "includesHealthPlanNetwork": { "@id": "schema:includesHealthPlanNetwork"},
        "includesObject": { "@id": "schema:includesObject"},
        "increasesRiskOf": { "@id": "schema:increasesRiskOf"},
        "industry": { "@id": "schema:industry"},
        "ineligibleRegion": { "@id": "schema:ineligibleRegion"},
        "infectiousAgent": { "@id": "schema:infectiousAgent"},
        "infectiousAgentClass": { "@id": "schema:infectiousAgentClass"},
        "ingredients": { "@id": "schema:ingredients"},
        "inker": { "@id": "schema:inker"},
        "insertion": { "@id": "schema:insertion"},
        "installUrl": { "@id": "schema:installUrl", "@type": "@id"},
        "instructor": { "@id": "schema:instructor"},
        "instrument": { "@id": "schema:instrument"},
        "intensity": { "@id": "schema:intensity"},
        "interactingDrug": { "@id": "schema:interactingDrug"},
        "interactionCount": { "@id": "schema:interactionCount"},
        "interactionService": { "@id": "schema:interactionService"},
        "interactionStatistic": { "@id": "schema:interactionStatistic"},
        "interactionType": { "@id": "schema:interactionType"},
        "interactivityType": { "@id": "schema:interactivityType"},
        "interestRate": { "@id": "schema:interestRate"},
        "inventoryLevel": { "@id": "schema:inventoryLevel"},
        "inverseOf": { "@id": "schema:inverseOf"},
        "isAcceptingNewPatients": { "@id": "schema:isAcceptingNewPatients"},
        "isAccessibleForFree": { "@id": "schema:isAccessibleForFree"},
        "isAccessoryOrSparePartFor": { "@id": "schema:isAccessoryOrSparePartFor"},
        "isAvailableGenerically": { "@id": "schema:isAvailableGenerically"},
        "isBasedOn": { "@id": "schema:isBasedOn", "@type": "@id"},
        "isBasedOnUrl": { "@id": "schema:isBasedOnUrl", "@type": "@id"},
        "isConsumableFor": { "@id": "schema:isConsumableFor"},
        "isFamilyFriendly": { "@id": "schema:isFamilyFriendly"},
        "isGift": { "@id": "schema:isGift"},
        "isLiveBroadcast": { "@id": "schema:isLiveBroadcast"},
        "isPartOf": { "@id": "schema:isPartOf", "@type": "@id"},
        "isPlanForApartment": { "@id": "schema:isPlanForApartment"},
        "isProprietary": { "@id": "schema:isProprietary"},
        "isRelatedTo": { "@id": "schema:isRelatedTo"},
        "isResizable": { "@id": "schema:isResizable"},
        "isSimilarTo": { "@id": "schema:isSimilarTo"},
        "isUnlabelledFallback": { "@id": "schema:isUnlabelledFallback"},
        "isVariantOf": { "@id": "schema:isVariantOf"},
        "isbn": { "@id": "schema:isbn"},
        "isicV4": { "@id": "schema:isicV4"},
        "isrcCode": { "@id": "schema:isrcCode"},
        "issn": { "@id": "schema:issn"},
        "issueNumber": { "@id": "schema:issueNumber"},
        "issuedBy": { "@id": "schema:issuedBy"},
        "issuedThrough": { "@id": "schema:issuedThrough"},
        "iswcCode": { "@id": "schema:iswcCode"},
        "item": { "@id": "schema:item"},
        "itemCondition": { "@id": "schema:itemCondition"},
        "itemListElement": { "@id": "schema:itemListElement"},
        "itemListOrder": { "@id": "schema:itemListOrder"},
        "itemLocation": { "@id": "schema:itemLocation"},
        "itemOffered": { "@id": "schema:itemOffered"},
        "itemReviewed": { "@id": "schema:itemReviewed"},
        "itemShipped": { "@id": "schema:itemShipped"},
        "itinerary": { "@id": "schema:itinerary"},
        "jobBenefits": { "@id": "schema:jobBenefits"},
        "jobImmediateStart": { "@id": "schema:jobImmediateStart"},
        "jobLocation": { "@id": "schema:jobLocation"},
        "jobLocationType": { "@id": "schema:jobLocationType"},
        "jobStartDate": { "@id": "schema:jobStartDate"},
        "jobTitle": { "@id": "schema:jobTitle"},
        "jurisdiction": { "@id": "schema:jurisdiction"},
        "keywords": { "@id": "schema:keywords"},
        "knownVehicleDamages": { "@id": "schema:knownVehicleDamages"},
        "knows": { "@id": "schema:knows"},
        "knowsAbout": { "@id": "schema:knowsAbout"},
        "knowsLanguage": { "@id": "schema:knowsLanguage"},
        "labelDetails": { "@id": "schema:labelDetails", "@type": "@id"},
        "landlord": { "@id": "schema:landlord"},
        "language": { "@id": "schema:language"},
        "lastReviewed": { "@id": "schema:lastReviewed", "@type": "Date"},
        "latitude": { "@id": "schema:latitude"},
        "learningResourceType": { "@id": "schema:learningResourceType"},
        "leaseLength": { "@id": "schema:leaseLength"},
        "legalName": { "@id": "schema:legalName"},
        "legalStatus": { "@id": "schema:legalStatus"},
        "legislationApplies": { "@id": "schema:legislationApplies"},
        "legislationChanges": { "@id": "schema:legislationChanges"},
        "legislationConsolidates": { "@id": "schema:legislationConsolidates"},
        "legislationDate": { "@id": "schema:legislationDate", "@type": "Date"},
        "legislationDateVersion": { "@id": "schema:legislationDateVersion", "@type": "Date"},
        "legislationIdentifier": { "@id": "schema:legislationIdentifier"},
        "legislationJurisdiction": { "@id": "schema:legislationJurisdiction"},
        "legislationLegalForce": { "@id": "schema:legislationLegalForce"},
        "legislationLegalValue": { "@id": "schema:legislationLegalValue"},
        "legislationPassedBy": { "@id": "schema:legislationPassedBy"},
        "legislationResponsible": { "@id": "schema:legislationResponsible"},
        "legislationTransposes": { "@id": "schema:legislationTransposes"},
        "legislationType": { "@id": "schema:legislationType"},
        "leiCode": { "@id": "schema:leiCode"},
        "lender": { "@id": "schema:lender"},
        "lesser": { "@id": "schema:lesser"},
        "lesserOrEqual": { "@id": "schema:lesserOrEqual"},
        "letterer": { "@id": "schema:letterer"},
        "license": { "@id": "schema:license", "@type": "@id"},
        "line": { "@id": "schema:line"},
        "linkRelationship": { "@id": "schema:linkRelationship"},
        "liveBlogUpdate": { "@id": "schema:liveBlogUpdate"},
        "loanMortgageMandateAmount": { "@id": "schema:loanMortgageMandateAmount"},
        "loanPaymentAmount": { "@id": "schema:loanPaymentAmount"},
        "loanPaymentFrequency": { "@id": "schema:loanPaymentFrequency"},
        "loanRepaymentForm": { "@id": "schema:loanRepaymentForm"},
        "loanTerm": { "@id": "schema:loanTerm"},
        "loanType": { "@id": "schema:loanType"},
        "location": { "@id": "schema:location"},
        "locationCreated": { "@id": "schema:locationCreated"},
        "lodgingUnitDescription": { "@id": "schema:lodgingUnitDescription"},
        "lodgingUnitType": { "@id": "schema:lodgingUnitType"},
        "logo": { "@id": "schema:logo", "@type": "@id"},
        "longitude": { "@id": "schema:longitude"},
        "loser": { "@id": "schema:loser"},
        "lowPrice": { "@id": "schema:lowPrice"},
        "lyricist": { "@id": "schema:lyricist"},
        "lyrics": { "@id": "schema:lyrics"},
        "mainContentOfPage": { "@id": "schema:mainContentOfPage"},
        "mainEntity": { "@id": "schema:mainEntity"},
        "mainEntityOfPage": { "@id": "schema:mainEntityOfPage", "@type": "@id"},
        "maintainer": { "@id": "schema:maintainer"},
        "makesOffer": { "@id": "schema:makesOffer"},
        "manufacturer": { "@id": "schema:manufacturer"},
        "map": { "@id": "schema:map", "@type": "@id"},
        "mapType": { "@id": "schema:mapType"},
        "maps": { "@id": "schema:maps", "@type": "@id"},
        "marginOfError": { "@id": "schema:marginOfError", "@type": "DateTime"},
        "masthead": { "@id": "schema:masthead", "@type": "@id"},
        "material": { "@id": "schema:material"},
        "materialExtent": { "@id": "schema:materialExtent"},
        "maxPrice": { "@id": "schema:maxPrice"},
        "maxValue": { "@id": "schema:maxValue"},
        "maximumAttendeeCapacity": { "@id": "schema:maximumAttendeeCapacity"},
        "maximumEnrollment": { "@id": "schema:maximumEnrollment"},
        "maximumIntake": { "@id": "schema:maximumIntake"},
        "maximumPhysicalAttendeeCapacity": { "@id": "schema:maximumPhysicalAttendeeCapacity"},
        "maximumVirtualAttendeeCapacity": { "@id": "schema:maximumVirtualAttendeeCapacity"},
        "mealService": { "@id": "schema:mealService"},
        "measuredProperty": { "@id": "schema:measuredProperty"},
        "measuredValue": { "@id": "schema:measuredValue"},
        "measurementTechnique": { "@id": "schema:measurementTechnique"},
        "mechanismOfAction": { "@id": "schema:mechanismOfAction"},
        "mediaAuthenticityCategory": { "@id": "schema:mediaAuthenticityCategory"},
        "median": { "@id": "schema:median"},
        "medicalSpecialty": { "@id": "schema:medicalSpecialty"},
        "medicineSystem": { "@id": "schema:medicineSystem"},
        "meetsEmissionStandard": { "@id": "schema:meetsEmissionStandard"},
        "member": { "@id": "schema:member"},
        "memberOf": { "@id": "schema:memberOf"},
        "members": { "@id": "schema:members"},
        "membershipNumber": { "@id": "schema:membershipNumber"},
        "membershipPointsEarned": { "@id": "schema:membershipPointsEarned"},
        "memoryRequirements": { "@id": "schema:memoryRequirements"},
        "mentions": { "@id": "schema:mentions"},
        "menu": { "@id": "schema:menu"},
        "menuAddOn": { "@id": "schema:menuAddOn"},
        "merchant": { "@id": "schema:merchant"},
        "merchantReturnDays": { "@id": "schema:merchantReturnDays"},
        "merchantReturnLink": { "@id": "schema:merchantReturnLink", "@type": "@id"},
        "messageAttachment": { "@id": "schema:messageAttachment"},
        "mileageFromOdometer": { "@id": "schema:mileageFromOdometer"},
        "minPrice": { "@id": "schema:minPrice"},
        "minValue": { "@id": "schema:minValue"},
        "minimumPaymentDue": { "@id": "schema:minimumPaymentDue"},
        "missionCoveragePrioritiesPolicy": { "@id": "schema:missionCoveragePrioritiesPolicy", "@type": "@id"},
        "model": { "@id": "schema:model"},
        "modelDate": { "@id": "schema:modelDate", "@type": "Date"},
        "modifiedTime": { "@id": "schema:modifiedTime", "@type": "DateTime"},
        "monthlyMinimumRepaymentAmount": { "@id": "schema:monthlyMinimumRepaymentAmount"},
        "mpn": { "@id": "schema:mpn"},
        "multipleValues": { "@id": "schema:multipleValues"},
        "muscleAction": { "@id": "schema:muscleAction"},
        "musicArrangement": { "@id": "schema:musicArrangement"},
        "musicBy": { "@id": "schema:musicBy"},
        "musicCompositionForm": { "@id": "schema:musicCompositionForm"},
        "musicGroupMember": { "@id": "schema:musicGroupMember"},
        "musicReleaseFormat": { "@id": "schema:musicReleaseFormat"},
        "musicalKey": { "@id": "schema:musicalKey"},
        "naics": { "@id": "schema:naics"},
        "name": { "@id": "schema:name"},
        "namedPosition": { "@id": "schema:namedPosition"},
        "nationality": { "@id": "schema:nationality"},
        "naturalProgression": { "@id": "schema:naturalProgression"},
        "nerve": { "@id": "schema:nerve"},
        "nerveMotor": { "@id": "schema:nerveMotor"},
        "netWorth": { "@id": "schema:netWorth"},
        "newsUpdatesAndGuidelines": { "@id": "schema:newsUpdatesAndGuidelines", "@type": "@id"},
        "nextItem": { "@id": "schema:nextItem"},
        "noBylinesPolicy": { "@id": "schema:noBylinesPolicy", "@type": "@id"},
        "nonEqual": { "@id": "schema:nonEqual"},
        "nonProprietaryName": { "@id": "schema:nonProprietaryName"},
        "nonprofitStatus": { "@id": "schema:nonprofitStatus"},
        "normalRange": { "@id": "schema:normalRange"},
        "nsn": { "@id": "schema:nsn"},
        "numAdults": { "@id": "schema:numAdults"},
        "numChildren": { "@id": "schema:numChildren"},
        "numConstraints": { "@id": "schema:numConstraints"},
        "numTracks": { "@id": "schema:numTracks"},
        "numberOfAccommodationUnits": { "@id": "schema:numberOfAccommodationUnits"},
        "numberOfAirbags": { "@id": "schema:numberOfAirbags"},
        "numberOfAvailableAccommodationUnits": { "@id": "schema:numberOfAvailableAccommodationUnits"},
        "numberOfAxles": { "@id": "schema:numberOfAxles"},
        "numberOfBathroomsTotal": { "@id": "schema:numberOfBathroomsTotal"},
        "numberOfBedrooms": { "@id": "schema:numberOfBedrooms"},
        "numberOfBeds": { "@id": "schema:numberOfBeds"},
        "numberOfCredits": { "@id": "schema:numberOfCredits"},
        "numberOfDoors": { "@id": "schema:numberOfDoors"},
        "numberOfEmployees": { "@id": "schema:numberOfEmployees"},
        "numberOfEpisodes": { "@id": "schema:numberOfEpisodes"},
        "numberOfForwardGears": { "@id": "schema:numberOfForwardGears"},
        "numberOfFullBathrooms": { "@id": "schema:numberOfFullBathrooms"},
        "numberOfItems": { "@id": "schema:numberOfItems"},
        "numberOfLoanPayments": { "@id": "schema:numberOfLoanPayments"},
        "numberOfPages": { "@id": "schema:numberOfPages"},
        "numberOfPartialBathrooms": { "@id": "schema:numberOfPartialBathrooms"},
        "numberOfPlayers": { "@id": "schema:numberOfPlayers"},
        "numberOfPreviousOwners": { "@id": "schema:numberOfPreviousOwners"},
        "numberOfRooms": { "@id": "schema:numberOfRooms"},
        "numberOfSeasons": { "@id": "schema:numberOfSeasons"},
        "numberedPosition": { "@id": "schema:numberedPosition"},
        "nutrition": { "@id": "schema:nutrition"},
        "object": { "@id": "schema:object"},
        "observationDate": { "@id": "schema:observationDate", "@type": "DateTime"},
        "observedNode": { "@id": "schema:observedNode"},
        "occupancy": { "@id": "schema:occupancy"},
        "occupationLocation": { "@id": "schema:occupationLocation"},
        "occupationalCategory": { "@id": "schema:occupationalCategory"},
        "occupationalCredentialAwarded": { "@id": "schema:occupationalCredentialAwarded"},
        "offerCount": { "@id": "schema:offerCount"},
        "offeredBy": { "@id": "schema:offeredBy"},
        "offers": { "@id": "schema:offers"},
        "offersPrescriptionByMail": { "@id": "schema:offersPrescriptionByMail"},
        "openingHours": { "@id": "schema:openingHours"},
        "openingHoursSpecification": { "@id": "schema:openingHoursSpecification"},
        "opens": { "@id": "schema:opens"},
        "operatingSystem": { "@id": "schema:operatingSystem"},
        "opponent": { "@id": "schema:opponent"},
        "option": { "@id": "schema:option"},
        "orderDate": { "@id": "schema:orderDate", "@type": "Date"},
        "orderDelivery": { "@id": "schema:orderDelivery"},
        "orderItemNumber": { "@id": "schema:orderItemNumber"},
        "orderItemStatus": { "@id": "schema:orderItemStatus"},
        "orderNumber": { "@id": "schema:orderNumber"},
        "orderQuantity": { "@id": "schema:orderQuantity"},
        "orderStatus": { "@id": "schema:orderStatus"},
        "orderedItem": { "@id": "schema:orderedItem"},
        "organizer": { "@id": "schema:organizer"},
        "originAddress": { "@id": "schema:originAddress"},
        "originatesFrom": { "@id": "schema:originatesFrom"},
        "overdosage": { "@id": "schema:overdosage"},
        "ownedFrom": { "@id": "schema:ownedFrom", "@type": "DateTime"},
        "ownedThrough": { "@id": "schema:ownedThrough", "@type": "DateTime"},
        "ownershipFundingInfo": { "@id": "schema:ownershipFundingInfo"},
        "owns": { "@id": "schema:owns"},
        "pageEnd": { "@id": "schema:pageEnd"},
        "pageStart": { "@id": "schema:pageStart"},
        "pagination": { "@id": "schema:pagination"},
        "parent": { "@id": "schema:parent"},
        "parentItem": { "@id": "schema:parentItem"},
        "parentOrganization": { "@id": "schema:parentOrganization"},
        "parentService": { "@id": "schema:parentService"},
        "parents": { "@id": "schema:parents"},
        "partOfEpisode": { "@id": "schema:partOfEpisode"},
        "partOfInvoice": { "@id": "schema:partOfInvoice"},
        "partOfOrder": { "@id": "schema:partOfOrder"},
        "partOfSeason": { "@id": "schema:partOfSeason"},
        "partOfSeries": { "@id": "schema:partOfSeries"},
        "partOfSystem": { "@id": "schema:partOfSystem"},
        "partOfTVSeries": { "@id": "schema:partOfTVSeries"},
        "partOfTrip": { "@id": "schema:partOfTrip"},
        "participant": { "@id": "schema:participant"},
        "partySize": { "@id": "schema:partySize"},
        "passengerPriorityStatus": { "@id": "schema:passengerPriorityStatus"},
        "passengerSequenceNumber": { "@id": "schema:passengerSequenceNumber"},
        "pathophysiology": { "@id": "schema:pathophysiology"},
        "payload": { "@id": "schema:payload"},
        "paymentAccepted": { "@id": "schema:paymentAccepted"},
        "paymentDue": { "@id": "schema:paymentDue", "@type": "DateTime"},
        "paymentDueDate": { "@id": "schema:paymentDueDate", "@type": "Date"},
        "paymentMethod": { "@id": "schema:paymentMethod"},
        "paymentMethodId": { "@id": "schema:paymentMethodId"},
        "paymentStatus": { "@id": "schema:paymentStatus"},
        "paymentUrl": { "@id": "schema:paymentUrl", "@type": "@id"},
        "penciler": { "@id": "schema:penciler"},
        "percentile10": { "@id": "schema:percentile10"},
        "percentile25": { "@id": "schema:percentile25"},
        "percentile75": { "@id": "schema:percentile75"},
        "percentile90": { "@id": "schema:percentile90"},
        "performTime": { "@id": "schema:performTime"},
        "performer": { "@id": "schema:performer"},
        "performerIn": { "@id": "schema:performerIn"},
        "performers": { "@id": "schema:performers"},
        "permissionType": { "@id": "schema:permissionType"},
        "permissions": { "@id": "schema:permissions"},
        "permitAudience": { "@id": "schema:permitAudience"},
        "permittedUsage": { "@id": "schema:permittedUsage"},
        "petsAllowed": { "@id": "schema:petsAllowed"},
        "phoneticText": { "@id": "schema:phoneticText"},
        "photo": { "@id": "schema:photo"},
        "photos": { "@id": "schema:photos"},
        "physicalRequirement": { "@id": "schema:physicalRequirement"},
        "physiologicalBenefits": { "@id": "schema:physiologicalBenefits"},
        "pickupLocation": { "@id": "schema:pickupLocation"},
        "pickupTime": { "@id": "schema:pickupTime", "@type": "DateTime"},
        "playMode": { "@id": "schema:playMode"},
        "playerType": { "@id": "schema:playerType"},
        "playersOnline": { "@id": "schema:playersOnline"},
        "polygon": { "@id": "schema:polygon"},
        "populationType": { "@id": "schema:populationType"},
        "position": { "@id": "schema:position"},
        "possibleComplication": { "@id": "schema:possibleComplication"},
        "possibleTreatment": { "@id": "schema:possibleTreatment"},
        "postOfficeBoxNumber": { "@id": "schema:postOfficeBoxNumber"},
        "postOp": { "@id": "schema:postOp"},
        "postalCode": { "@id": "schema:postalCode"},
        "postalCodeBegin": { "@id": "schema:postalCodeBegin"},
        "postalCodeEnd": { "@id": "schema:postalCodeEnd"},
        "postalCodePrefix": { "@id": "schema:postalCodePrefix"},
        "postalCodeRange": { "@id": "schema:postalCodeRange"},
        "potentialAction": { "@id": "schema:potentialAction"},
        "preOp": { "@id": "schema:preOp"},
        "predecessorOf": { "@id": "schema:predecessorOf"},
        "pregnancyCategory": { "@id": "schema:pregnancyCategory"},
        "pregnancyWarning": { "@id": "schema:pregnancyWarning"},
        "prepTime": { "@id": "schema:prepTime"},
        "preparation": { "@id": "schema:preparation"},
        "prescribingInfo": { "@id": "schema:prescribingInfo", "@type": "@id"},
        "prescriptionStatus": { "@id": "schema:prescriptionStatus"},
        "previousItem": { "@id": "schema:previousItem"},
        "previousStartDate": { "@id": "schema:previousStartDate", "@type": "Date"},
        "price": { "@id": "schema:price"},
        "priceComponent": { "@id": "schema:priceComponent"},
        "priceCurrency": { "@id": "schema:priceCurrency"},
        "priceRange": { "@id": "schema:priceRange"},
        "priceSpecification": { "@id": "schema:priceSpecification"},
        "priceType": { "@id": "schema:priceType"},
        "priceValidUntil": { "@id": "schema:priceValidUntil", "@type": "Date"},
        "primaryImageOfPage": { "@id": "schema:primaryImageOfPage"},
        "primaryPrevention": { "@id": "schema:primaryPrevention"},
        "printColumn": { "@id": "schema:printColumn"},
        "printEdition": { "@id": "schema:printEdition"},
        "printPage": { "@id": "schema:printPage"},
        "printSection": { "@id": "schema:printSection"},
        "procedure": { "@id": "schema:procedure"},
        "procedureType": { "@id": "schema:procedureType"},
        "processingTime": { "@id": "schema:processingTime"},
        "processorRequirements": { "@id": "schema:processorRequirements"},
        "producer": { "@id": "schema:producer"},
        "produces": { "@id": "schema:produces"},
        "productID": { "@id": "schema:productID"},
        "productReturnDays": { "@id": "schema:productReturnDays"},
        "productReturnLink": { "@id": "schema:productReturnLink", "@type": "@id"},
        "productSupported": { "@id": "schema:productSupported"},
        "productionCompany": { "@id": "schema:productionCompany"},
        "productionDate": { "@id": "schema:productionDate", "@type": "Date"},
        "proficiencyLevel": { "@id": "schema:proficiencyLevel"},
        "programMembershipUsed": { "@id": "schema:programMembershipUsed"},
        "programName": { "@id": "schema:programName"},
        "programPrerequisites": { "@id": "schema:programPrerequisites"},
        "programType": { "@id": "schema:programType"},
        "programmingLanguage": { "@id": "schema:programmingLanguage"},
        "programmingModel": { "@id": "schema:programmingModel"},
        "propertyID": { "@id": "schema:propertyID"},
        "proprietaryName": { "@id": "schema:proprietaryName"},
        "proteinContent": { "@id": "schema:proteinContent"},
        "provider": { "@id": "schema:provider"},
        "providerMobility": { "@id": "schema:providerMobility"},
        "providesBroadcastService": { "@id": "schema:providesBroadcastService"},
        "providesService": { "@id": "schema:providesService"},
        "publicAccess": { "@id": "schema:publicAccess"},
        "publicTransportClosuresInfo": { "@id": "schema:publicTransportClosuresInfo", "@type": "@id"},
        "publication": { "@id": "schema:publication"},
        "publicationType": { "@id": "schema:publicationType"},
        "publishedBy": { "@id": "schema:publishedBy"},
        "publishedOn": { "@id": "schema:publishedOn"},
        "publisher": { "@id": "schema:publisher"},
        "publisherImprint": { "@id": "schema:publisherImprint"},
        "publishingPrinciples": { "@id": "schema:publishingPrinciples", "@type": "@id"},
        "purchaseDate": { "@id": "schema:purchaseDate", "@type": "Date"},
        "qualifications": { "@id": "schema:qualifications"},
        "quarantineGuidelines": { "@id": "schema:quarantineGuidelines", "@type": "@id"},
        "query": { "@id": "schema:query"},
        "quest": { "@id": "schema:quest"},
        "question": { "@id": "schema:question"},
        "rangeIncludes": { "@id": "schema:rangeIncludes"},
        "ratingCount": { "@id": "schema:ratingCount"},
        "ratingExplanation": { "@id": "schema:ratingExplanation"},
        "ratingValue": { "@id": "schema:ratingValue"},
        "readBy": { "@id": "schema:readBy"},
        "readonlyValue": { "@id": "schema:readonlyValue"},
        "realEstateAgent": { "@id": "schema:realEstateAgent"},
        "recipe": { "@id": "schema:recipe"},
        "recipeCategory": { "@id": "schema:recipeCategory"},
        "recipeCuisine": { "@id": "schema:recipeCuisine"},
        "recipeIngredient": { "@id": "schema:recipeIngredient"},
        "recipeInstructions": { "@id": "schema:recipeInstructions"},
        "recipeYield": { "@id": "schema:recipeYield"},
        "recipient": { "@id": "schema:recipient"},
        "recognizedBy": { "@id": "schema:recognizedBy"},
        "recognizingAuthority": { "@id": "schema:recognizingAuthority"},
        "recommendationStrength": { "@id": "schema:recommendationStrength"},
        "recommendedIntake": { "@id": "schema:recommendedIntake"},
        "recordLabel": { "@id": "schema:recordLabel"},
        "recordedAs": { "@id": "schema:recordedAs"},
        "recordedAt": { "@id": "schema:recordedAt"},
        "recordedIn": { "@id": "schema:recordedIn"},
        "recordingOf": { "@id": "schema:recordingOf"},
        "recourseLoan": { "@id": "schema:recourseLoan"},
        "referenceQuantity": { "@id": "schema:referenceQuantity"},
        "referencesOrder": { "@id": "schema:referencesOrder"},
        "refundType": { "@id": "schema:refundType"},
        "regionDrained": { "@id": "schema:regionDrained"},
        "regionsAllowed": { "@id": "schema:regionsAllowed"},
        "relatedAnatomy": { "@id": "schema:relatedAnatomy"},
        "relatedCondition": { "@id": "schema:relatedCondition"},
        "relatedDrug": { "@id": "schema:relatedDrug"},
        "relatedLink": { "@id": "schema:relatedLink", "@type": "@id"},
        "relatedStructure": { "@id": "schema:relatedStructure"},
        "relatedTherapy": { "@id": "schema:relatedTherapy"},
        "relatedTo": { "@id": "schema:relatedTo"},
        "releaseDate": { "@id": "schema:releaseDate", "@type": "Date"},
        "releaseNotes": { "@id": "schema:releaseNotes"},
        "releaseOf": { "@id": "schema:releaseOf"},
        "releasedEvent": { "@id": "schema:releasedEvent"},
        "relevantOccupation": { "@id": "schema:relevantOccupation"},
        "relevantSpecialty": { "@id": "schema:relevantSpecialty"},
        "remainingAttendeeCapacity": { "@id": "schema:remainingAttendeeCapacity"},
        "renegotiableLoan": { "@id": "schema:renegotiableLoan"},
        "repeatCount": { "@id": "schema:repeatCount"},
        "repeatFrequency": { "@id": "schema:repeatFrequency"},
        "repetitions": { "@id": "schema:repetitions"},
        "replacee": { "@id": "schema:replacee"},
        "replacer": { "@id": "schema:replacer"},
        "replyToUrl": { "@id": "schema:replyToUrl", "@type": "@id"},
        "reportNumber": { "@id": "schema:reportNumber"},
        "representativeOfPage": { "@id": "schema:representativeOfPage"},
        "requiredCollateral": { "@id": "schema:requiredCollateral"},
        "requiredGender": { "@id": "schema:requiredGender"},
        "requiredMaxAge": { "@id": "schema:requiredMaxAge"},
        "requiredMinAge": { "@id": "schema:requiredMinAge"},
        "requiredQuantity": { "@id": "schema:requiredQuantity"},
        "requirements": { "@id": "schema:requirements"},
        "requiresSubscription": { "@id": "schema:requiresSubscription"},
        "reservationFor": { "@id": "schema:reservationFor"},
        "reservationId": { "@id": "schema:reservationId"},
        "reservationStatus": { "@id": "schema:reservationStatus"},
        "reservedTicket": { "@id": "schema:reservedTicket"},
        "responsibilities": { "@id": "schema:responsibilities"},
        "restPeriods": { "@id": "schema:restPeriods"},
        "result": { "@id": "schema:result"},
        "resultComment": { "@id": "schema:resultComment"},
        "resultReview": { "@id": "schema:resultReview"},
        "returnFees": { "@id": "schema:returnFees"},
        "returnPolicyCategory": { "@id": "schema:returnPolicyCategory"},
        "review": { "@id": "schema:review"},
        "reviewAspect": { "@id": "schema:reviewAspect"},
        "reviewBody": { "@id": "schema:reviewBody"},
        "reviewCount": { "@id": "schema:reviewCount"},
        "reviewRating": { "@id": "schema:reviewRating"},
        "reviewedBy": { "@id": "schema:reviewedBy"},
        "reviews": { "@id": "schema:reviews"},
        "riskFactor": { "@id": "schema:riskFactor"},
        "risks": { "@id": "schema:risks"},
        "roleName": { "@id": "schema:roleName"},
        "roofLoad": { "@id": "schema:roofLoad"},
        "rsvpResponse": { "@id": "schema:rsvpResponse"},
        "runsTo": { "@id": "schema:runsTo"},
        "runtime": { "@id": "schema:runtime"},
        "runtimePlatform": { "@id": "schema:runtimePlatform"},
        "rxcui": { "@id": "schema:rxcui"},
        "safetyConsideration": { "@id": "schema:safetyConsideration"},
        "salaryCurrency": { "@id": "schema:salaryCurrency"},
        "salaryUponCompletion": { "@id": "schema:salaryUponCompletion"},
        "sameAs": { "@id": "schema:sameAs", "@type": "@id"},
        "sampleType": { "@id": "schema:sampleType"},
        "saturatedFatContent": { "@id": "schema:saturatedFatContent"},
        "scheduleTimezone": { "@id": "schema:scheduleTimezone"},
        "scheduledPaymentDate": { "@id": "schema:scheduledPaymentDate", "@type": "Date"},
        "scheduledTime": { "@id": "schema:scheduledTime", "@type": "DateTime"},
        "schemaVersion": { "@id": "schema:schemaVersion"},
        "schoolClosuresInfo": { "@id": "schema:schoolClosuresInfo", "@type": "@id"},
        "screenCount": { "@id": "schema:screenCount"},
        "screenshot": { "@id": "schema:screenshot", "@type": "@id"},
        "sdDatePublished": { "@id": "schema:sdDatePublished", "@type": "Date"},
        "sdLicense": { "@id": "schema:sdLicense", "@type": "@id"},
        "sdPublisher": { "@id": "schema:sdPublisher"},
        "season": { "@id": "schema:season", "@type": "@id"},
        "seasonNumber": { "@id": "schema:seasonNumber"},
        "seasons": { "@id": "schema:seasons"},
        "seatNumber": { "@id": "schema:seatNumber"},
        "seatRow": { "@id": "schema:seatRow"},
        "seatSection": { "@id": "schema:seatSection"},
        "seatingCapacity": { "@id": "schema:seatingCapacity"},
        "seatingType": { "@id": "schema:seatingType"},
        "secondaryPrevention": { "@id": "schema:secondaryPrevention"},
        "securityClearanceRequirement": { "@id": "schema:securityClearanceRequirement"},
        "securityScreening": { "@id": "schema:securityScreening"},
        "seeks": { "@id": "schema:seeks"},
        "seller": { "@id": "schema:seller"},
        "sender": { "@id": "schema:sender"},
        "sensoryRequirement": { "@id": "schema:sensoryRequirement"},
        "sensoryUnit": { "@id": "schema:sensoryUnit"},
        "serialNumber": { "@id": "schema:serialNumber"},
        "seriousAdverseOutcome": { "@id": "schema:seriousAdverseOutcome"},
        "serverStatus": { "@id": "schema:serverStatus"},
        "servesCuisine": { "@id": "schema:servesCuisine"},
        "serviceArea": { "@id": "schema:serviceArea"},
        "serviceAudience": { "@id": "schema:serviceAudience"},
        "serviceLocation": { "@id": "schema:serviceLocation"},
        "serviceOperator": { "@id": "schema:serviceOperator"},
        "serviceOutput": { "@id": "schema:serviceOutput"},
        "servicePhone": { "@id": "schema:servicePhone"},
        "servicePostalAddress": { "@id": "schema:servicePostalAddress"},
        "serviceSmsNumber": { "@id": "schema:serviceSmsNumber"},
        "serviceType": { "@id": "schema:serviceType"},
        "serviceUrl": { "@id": "schema:serviceUrl", "@type": "@id"},
        "servingSize": { "@id": "schema:servingSize"},
        "sharedContent": { "@id": "schema:sharedContent"},
        "shippingDestination": { "@id": "schema:shippingDestination"},
        "shippingDetails": { "@id": "schema:shippingDetails"},
        "shippingLabel": { "@id": "schema:shippingLabel"},
        "shippingRate": { "@id": "schema:shippingRate"},
        "shippingSettingsLink": { "@id": "schema:shippingSettingsLink", "@type": "@id"},
        "sibling": { "@id": "schema:sibling"},
        "siblings": { "@id": "schema:siblings"},
        "signDetected": { "@id": "schema:signDetected"},
        "signOrSymptom": { "@id": "schema:signOrSymptom"},
        "significance": { "@id": "schema:significance"},
        "significantLink": { "@id": "schema:significantLink", "@type": "@id"},
        "significantLinks": { "@id": "schema:significantLinks", "@type": "@id"},
        "skills": { "@id": "schema:skills"},
        "sku": { "@id": "schema:sku"},
        "slogan": { "@id": "schema:slogan"},
        "smokingAllowed": { "@id": "schema:smokingAllowed"},
        "sodiumContent": { "@id": "schema:sodiumContent"},
        "softwareAddOn": { "@id": "schema:softwareAddOn"},
        "softwareHelp": { "@id": "schema:softwareHelp"},
        "softwareRequirements": { "@id": "schema:softwareRequirements"},
        "softwareVersion": { "@id": "schema:softwareVersion"},
        "sourceOrganization": { "@id": "schema:sourceOrganization"},
        "sourcedFrom": { "@id": "schema:sourcedFrom"},
        "spatial": { "@id": "schema:spatial"},
        "spatialCoverage": { "@id": "schema:spatialCoverage"},
        "speakable": { "@id": "schema:speakable", "@type": "@id"},
        "specialCommitments": { "@id": "schema:specialCommitments"},
        "specialOpeningHoursSpecification": { "@id": "schema:specialOpeningHoursSpecification"},
        "specialty": { "@id": "schema:specialty"},
        "speechToTextMarkup": { "@id": "schema:speechToTextMarkup"},
        "speed": { "@id": "schema:speed"},
        "spokenByCharacter": { "@id": "schema:spokenByCharacter"},
        "sponsor": { "@id": "schema:sponsor"},
        "sport": { "@id": "schema:sport"},
        "sportsActivityLocation": { "@id": "schema:sportsActivityLocation"},
        "sportsEvent": { "@id": "schema:sportsEvent"},
        "sportsTeam": { "@id": "schema:sportsTeam"},
        "spouse": { "@id": "schema:spouse"},
        "stage": { "@id": "schema:stage"},
        "stageAsNumber": { "@id": "schema:stageAsNumber"},
        "starRating": { "@id": "schema:starRating"},
        "startDate": { "@id": "schema:startDate", "@type": "Date"},
        "startOffset": { "@id": "schema:startOffset"},
        "startTime": { "@id": "schema:startTime", "@type": "DateTime"},
        "status": { "@id": "schema:status"},
        "steeringPosition": { "@id": "schema:steeringPosition"},
        "step": { "@id": "schema:step"},
        "stepValue": { "@id": "schema:stepValue"},
        "steps": { "@id": "schema:steps"},
        "storageRequirements": { "@id": "schema:storageRequirements"},
        "streetAddress": { "@id": "schema:streetAddress"},
        "strengthUnit": { "@id": "schema:strengthUnit"},
        "strengthValue": { "@id": "schema:strengthValue"},
        "structuralClass": { "@id": "schema:structuralClass"},
        "study": { "@id": "schema:study"},
        "studyDesign": { "@id": "schema:studyDesign"},
        "studyLocation": { "@id": "schema:studyLocation"},
        "studySubject": { "@id": "schema:studySubject"},
        "stupidProperty": { "@id": "schema:stupidProperty"},
        "subEvent": { "@id": "schema:subEvent"},
        "subEvents": { "@id": "schema:subEvents"},
        "subOrganization": { "@id": "schema:subOrganization"},
        "subReservation": { "@id": "schema:subReservation"},
        "subStageSuffix": { "@id": "schema:subStageSuffix"},
        "subStructure": { "@id": "schema:subStructure"},
        "subTest": { "@id": "schema:subTest"},
        "subTrip": { "@id": "schema:subTrip"},
        "subjectOf": { "@id": "schema:subjectOf"},
        "subtitleLanguage": { "@id": "schema:subtitleLanguage"},
        "successorOf": { "@id": "schema:successorOf"},
        "sugarContent": { "@id": "schema:sugarContent"},
        "suggestedAnswer": { "@id": "schema:suggestedAnswer"},
        "suggestedGender": { "@id": "schema:suggestedGender"},
        "suggestedMaxAge": { "@id": "schema:suggestedMaxAge"},
        "suggestedMinAge": { "@id": "schema:suggestedMinAge"},
        "suitableForDiet": { "@id": "schema:suitableForDiet"},
        "superEvent": { "@id": "schema:superEvent"},
        "supersededBy": { "@id": "schema:supersededBy"},
        "supply": { "@id": "schema:supply"},
        "supplyTo": { "@id": "schema:supplyTo"},
        "supportingData": { "@id": "schema:supportingData"},
        "surface": { "@id": "schema:surface"},
        "target": { "@id": "schema:target"},
        "targetCollection": { "@id": "schema:targetCollection"},
        "targetDescription": { "@id": "schema:targetDescription"},
        "targetName": { "@id": "schema:targetName"},
        "targetPlatform": { "@id": "schema:targetPlatform"},
        "targetPopulation": { "@id": "schema:targetPopulation"},
        "targetProduct": { "@id": "schema:targetProduct"},
        "targetUrl": { "@id": "schema:targetUrl", "@type": "@id"},
        "taxID": { "@id": "schema:taxID"},
        "teaches": { "@id": "schema:teaches"},
        "telephone": { "@id": "schema:telephone"},
        "temporal": { "@id": "schema:temporal"},
        "temporalCoverage": { "@id": "schema:temporalCoverage"},
        "termCode": { "@id": "schema:termCode"},
        "termDuration": { "@id": "schema:termDuration"},
        "termsOfService": { "@id": "schema:termsOfService"},
        "termsPerYear": { "@id": "schema:termsPerYear"},
        "text": { "@id": "schema:text"},
        "textValue": { "@id": "schema:textValue"},
        "thumbnail": { "@id": "schema:thumbnail"},
        "thumbnailUrl": { "@id": "schema:thumbnailUrl", "@type": "@id"},
        "tickerSymbol": { "@id": "schema:tickerSymbol"},
        "ticketNumber": { "@id": "schema:ticketNumber"},
        "ticketToken": { "@id": "schema:ticketToken"},
        "ticketedSeat": { "@id": "schema:ticketedSeat"},
        "timeOfDay": { "@id": "schema:timeOfDay"},
        "timeRequired": { "@id": "schema:timeRequired"},
        "timeToComplete": { "@id": "schema:timeToComplete"},
        "tissueSample": { "@id": "schema:tissueSample"},
        "title": { "@id": "schema:title"},
        "titleEIDR": { "@id": "schema:titleEIDR"},
        "toLocation": { "@id": "schema:toLocation"},
        "toRecipient": { "@id": "schema:toRecipient"},
        "tongueWeight": { "@id": "schema:tongueWeight"},
        "tool": { "@id": "schema:tool"},
        "torque": { "@id": "schema:torque"},
        "totalJobOpenings": { "@id": "schema:totalJobOpenings"},
        "totalPaymentDue": { "@id": "schema:totalPaymentDue"},
        "totalPrice": { "@id": "schema:totalPrice"},
        "totalTime": { "@id": "schema:totalTime"},
        "tourBookingPage": { "@id": "schema:tourBookingPage", "@type": "@id"},
        "touristType": { "@id": "schema:touristType"},
        "track": { "@id": "schema:track"},
        "trackingNumber": { "@id": "schema:trackingNumber"},
        "trackingUrl": { "@id": "schema:trackingUrl", "@type": "@id"},
        "tracks": { "@id": "schema:tracks"},
        "trailer": { "@id": "schema:trailer"},
        "trailerWeight": { "@id": "schema:trailerWeight"},
        "trainName": { "@id": "schema:trainName"},
        "trainNumber": { "@id": "schema:trainNumber"},
        "trainingSalary": { "@id": "schema:trainingSalary"},
        "transFatContent": { "@id": "schema:transFatContent"},
        "transcript": { "@id": "schema:transcript"},
        "transitTime": { "@id": "schema:transitTime"},
        "transitTimeLabel": { "@id": "schema:transitTimeLabel"},
        "translationOfWork": { "@id": "schema:translationOfWork"},
        "translator": { "@id": "schema:translator"},
        "transmissionMethod": { "@id": "schema:transmissionMethod"},
        "travelBans": { "@id": "schema:travelBans", "@type": "@id"},
        "trialDesign": { "@id": "schema:trialDesign"},
        "tributary": { "@id": "schema:tributary"},
        "typeOfBed": { "@id": "schema:typeOfBed"},
        "typeOfGood": { "@id": "schema:typeOfGood"},
        "typicalAgeRange": { "@id": "schema:typicalAgeRange"},
        "typicalCreditsPerTerm": { "@id": "schema:typicalCreditsPerTerm"},
        "typicalTest": { "@id": "schema:typicalTest"},
        "underName": { "@id": "schema:underName"},
        "unitCode": { "@id": "schema:unitCode"},
        "unitText": { "@id": "schema:unitText"},
        "unnamedSourcesPolicy": { "@id": "schema:unnamedSourcesPolicy", "@type": "@id"},
        "unsaturatedFatContent": { "@id": "schema:unsaturatedFatContent"},
        "uploadDate": { "@id": "schema:uploadDate", "@type": "Date"},
        "upvoteCount": { "@id": "schema:upvoteCount"},
        "url": { "@id": "schema:url", "@type": "@id"},
        "urlTemplate": { "@id": "schema:urlTemplate"},
        "usageInfo": { "@id": "schema:usageInfo", "@type": "@id"},
        "usedToDiagnose": { "@id": "schema:usedToDiagnose"},
        "userInteractionCount": { "@id": "schema:userInteractionCount"},
        "usesDevice": { "@id": "schema:usesDevice"},
        "usesHealthPlanIdStandard": { "@id": "schema:usesHealthPlanIdStandard"},
        "validFor": { "@id": "schema:validFor"},
        "validFrom": { "@id": "schema:validFrom", "@type": "Date"},
        "validIn": { "@id": "schema:validIn"},
        "validThrough": { "@id": "schema:validThrough", "@type": "Date"},
        "validUntil": { "@id": "schema:validUntil", "@type": "Date"},
        "value": { "@id": "schema:value"},
        "valueAddedTaxIncluded": { "@id": "schema:valueAddedTaxIncluded"},
        "valueMaxLength": { "@id": "schema:valueMaxLength"},
        "valueMinLength": { "@id": "schema:valueMinLength"},
        "valueName": { "@id": "schema:valueName"},
        "valuePattern": { "@id": "schema:valuePattern"},
        "valueReference": { "@id": "schema:valueReference"},
        "valueRequired": { "@id": "schema:valueRequired"},
        "variableMeasured": { "@id": "schema:variableMeasured"},
        "variablesMeasured": { "@id": "schema:variablesMeasured"},
        "variantCover": { "@id": "schema:variantCover"},
        "vatID": { "@id": "schema:vatID"},
        "vehicleConfiguration": { "@id": "schema:vehicleConfiguration"},
        "vehicleEngine": { "@id": "schema:vehicleEngine"},
        "vehicleIdentificationNumber": { "@id": "schema:vehicleIdentificationNumber"},
        "vehicleInteriorColor": { "@id": "schema:vehicleInteriorColor"},
        "vehicleInteriorType": { "@id": "schema:vehicleInteriorType"},
        "vehicleModelDate": { "@id": "schema:vehicleModelDate", "@type": "Date"},
        "vehicleSeatingCapacity": { "@id": "schema:vehicleSeatingCapacity"},
        "vehicleSpecialUsage": { "@id": "schema:vehicleSpecialUsage"},
        "vehicleTransmission": { "@id": "schema:vehicleTransmission"},
        "vendor": { "@id": "schema:vendor"},
        "verificationFactCheckingPolicy": { "@id": "schema:verificationFactCheckingPolicy", "@type": "@id"},
        "version": { "@id": "schema:version"},
        "video": { "@id": "schema:video"},
        "videoFormat": { "@id": "schema:videoFormat"},
        "videoFrameSize": { "@id": "schema:videoFrameSize"},
        "videoQuality": { "@id": "schema:videoQuality"},
        "volumeNumber": { "@id": "schema:volumeNumber"},
        "warning": { "@id": "schema:warning"},
        "warranty": { "@id": "schema:warranty"},
        "warrantyPromise": { "@id": "schema:warrantyPromise"},
        "warrantyScope": { "@id": "schema:warrantyScope"},
        "webCheckinTime": { "@id": "schema:webCheckinTime", "@type": "DateTime"},
        "webFeed": { "@id": "schema:webFeed", "@type": "@id"},
        "weight": { "@id": "schema:weight"},
        "weightTotal": { "@id": "schema:weightTotal"},
        "wheelbase": { "@id": "schema:wheelbase"},
        "width": { "@id": "schema:width"},
        "winner": { "@id": "schema:winner"},
        "wordCount": { "@id": "schema:wordCount"},
        "workExample": { "@id": "schema:workExample"},
        "workFeatured": { "@id": "schema:workFeatured"},
        "workHours": { "@id": "schema:workHours"},
        "workLocation": { "@id": "schema:workLocation"},
        "workPerformed": { "@id": "schema:workPerformed"},
        "workPresented": { "@id": "schema:workPresented"},
        "workTranslation": { "@id": "schema:workTranslation"},
        "workload": { "@id": "schema:workload"},
        "worksFor": { "@id": "schema:worksFor"},
        "worstRating": { "@id": "schema:worstRating"},
        "xpath": { "@id": "schema:xpath"},
        "yearBuilt": { "@id": "schema:yearBuilt"},
        "yearlyRevenue": { "@id": "schema:yearlyRevenue"},
        "yearsInOperation": { "@id": "schema:yearsInOperation"},
        "yield": { "@id": "schema:yield"},
        "http://publications.europa.eu/mdr/eli/index.html": {"@id": "http://publications.europa.eu/mdr/eli/index.html"},
        "httpMethod": { "@id": "schema:httpMethod"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#Automotive_Ontology_Working_Group": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#Automotive_Ontology_Working_Group"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#FIBO": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#FIBO"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#GLEIF": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#GLEIF"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#IIT-CNR.it": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#IIT-CNR.it"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#MBZ": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#MBZ"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#Tourism": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#Tourism"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_ActionCollabClass": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_ActionCollabClass"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_DatasetClass": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_DatasetClass"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_GoodRelationsClass": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_GoodRelationsClass"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_GoodRelationsTerms": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_GoodRelationsTerms"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_LRMIClass": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_LRMIClass"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_QAStackExchange": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_QAStackExchange"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_WikiDoc": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_WikiDoc"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_bibex": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_bibex"},
        "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews": {"@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews"},
        "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#STI_Accommodation_Ontology": {"@id": "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#STI_Accommodation_Ontology"},
        "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#TP": {"@id": "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#TP"},
        "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#TP-draws": {"@id": "https://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#TP-draws"}
    }
  }
}

//  */

/*
jsonld.documentLoader = function (url, callback) {
  if (url in cachedJsonLdContexts) {
    return callback(
      null, {
        contextUrl: null, // this is for a context via a link header
        document: cachedJsonLdContexts[url], // this is the actual document that was loaded
        documentUrl: url // this is the actual context URL after redirects
      })
  } else {
    throw new Error('invalid context: ' + url)
    // console.log('invalid context: ' + url)
  }
}
 */

const jsonldDefaultDocumentLoader = jsonld.documentLoader;

const customLoader = async(url, options) => {
    if (url in cachedJsonLdContexts) {
        return {
            contextUrl: null, // this is for a context via a link header
            document: cachedJsonLdContexts[url], // this is the actual document that was loaded
            documentUrl: url // this is the actual context URL after redirects
        }
    }

    // call the default documentLoader
    return jsonldDefaultDocumentLoader(url)
}
jsonld.documentLoader = customLoader

document.forms['fileUploadForm'].elements['fileUpload'].onchange = function (evt) {
  if (!window.FileReader) {
    alert('ERROR: This functionality does not work in your browser.')

    return false
  }

  var reader = new FileReader()

  reader.onload = function (evt) {
    if (evt.target.readyState !== 2) return
    if (evt.target.error) {
      alert('ERROR: An unexpected error occured while uploading file.')
      return
    }

    // filecontent = evt.target.result;

    if (cidme.validate(JSON.parse(evt.target.result)) === false) {
      alert('ERROR:  Invalid CIDME Entity uploaded.')
    } else {
      currentEntity = JSON.parse(evt.target.result)
      document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
      ceVisualizeEntity()
    }
  }

  reader.readAsText(evt.target.files[0])
}

document.getElementById('ce_entityData').onchange = function () {
  // alert('Change detected!')
  if (cidme.validate(JSON.parse(document.getElementById('ce_entityData').value)) === false) {
    alert('ERROR:  Invalid CIDME Entity.')
  } else {
    currentEntity = JSON.parse(document.getElementById('ce_entityData').value)
    ceVisualizeEntity()
  }
}

function ceAction (action) {
  // alert(action);

  if (action === 'createEntity') {
    // alert(JSON.stringify(cidme.createEntityResource()));
    currentEntity = cidme.createEntityResource()


    if ($('#ce_createEntityType').val() !== 'Blank') {
      let newResource = null
      let newResourceOptions = null

      // Add entity label metadata
      newResourceOptions = {
        groupDataType: [
          {
            "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
            "@type": "LabelMetadata"
          }
        ],
        data: [
          {
            "@context": {
            "@vocab": "http://www.w3.org/2004/02/skos/core#"
            },
            "prefLabel": "INSERT_LABEL_HERE"
          }
        ]                                
      }
      newResource = cidme.createMetadataGroupResource(currentEntity['@id'], newResourceOptions)
      currentEntity = cidme.addResourceToParent(currentEntity['@id'], currentEntity, newResource)
      
      // Add entity context
      newResource = cidme.createEntityContextResource(currentEntity['@id'])
      currentEntity = cidme.addResourceToParent(currentEntity['@id'], currentEntity, newResource)

      let entityContextResourceUri = newResource['@id']

      // Add entity context label metadata
      newResourceOptions = {
        groupDataType: [
          {
            "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
            "@type": "LabelMetadata"
          }
        ],
        data: [
          {
            "@context": {
            "@vocab": "http://www.w3.org/2004/02/skos/core#"
            },
            "prefLabel": "DEFAULT ENTITY CONTEXT"
          }
        ]                                
      }
      newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
      currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)

      // Add entity context default metadata
      newResourceOptions = {
        groupDataType: [
          {
            "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
            "@type": "DefaultMetadata"
          }
        ],
        data: [
          {
            "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
            "default": true
          }
        ]
      }
      newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
      currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)

      //alert($('#ce_createEntityType').val())
      if ($('#ce_createEntityType').val() === 'Person') {

        // Add entity context entity type metadata
        newResourceOptions = {
          groupDataType: [
            {
              "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
              "@type": "EntityTypeMetadata"
            }
          ],
          data: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "entityType": "http://cidme.net/vocab/ext/0.1.0/PersonEntityType"
            }
          ]
        }
        newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
        currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)

        // Add entity context data group
        newResourceOptions = {
          groupDataType: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "@type": "PersonNameEntityContextData"
            }
          ],
          data: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "displayName": "",
              "indexName": "",
              "prefixName": "",
              "givenName": "",
              "givenInformalName": "",
              "middleName": "",
              "familyName": "",
              "suffixName": "",
              "nickName": "",
              "generationQualifier": ""
            }
          ]
        }
        newResource = cidme.createEntityContextDataGroupResource(entityContextResourceUri, newResourceOptions)
        currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)


      } else if ($('#ce_createEntityType').val() === 'Organization') {
        // Add entity context entity type metadata
        newResourceOptions = {
          groupDataType: [
            {
              "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
              "@type": "EntityTypeMetadata"
            }
          ],
          data: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "entityType": "http://cidme.net/vocab/ext/0.1.0/OrganizationEntityType"
            }
          ]
        }
        newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
        currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)      
      } else if ($('#ce_createEntityType').val() === 'Place') {
        // Add entity context entity type metadata
        newResourceOptions = {
          groupDataType: [
            {
              "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
              "@type": "EntityTypeMetadata"
            }
          ],
          data: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "entityType": "http://cidme.net/vocab/ext/0.1.0/PlaceEntityType"
            }
          ]
        }
        newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
        currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)        
      } else if ($('#ce_createEntityType').val() === 'Thing') {
        // Add entity context entity type metadata
        newResourceOptions = {
          groupDataType: [
            {
              "@context": "http://cidme.net/vocab/core/0.4.0/jsonldcontext.json",
              "@type": "EntityTypeMetadata"
            }
          ],
          data: [
            {
              "@context": "http://cidme.net/vocab/ext/0.1.0/jsonldcontext.json",
              "entityType": "http://cidme.net/vocab/ext/0.1.0/ThingEntityType"
            }
          ]
        }
        newResource = cidme.createMetadataGroupResource(entityContextResourceUri, newResourceOptions)
        currentEntity = cidme.addResourceToParent(entityContextResourceUri, currentEntity, newResource)
      }
    }

    // document.forms['fileUploadForm'].elements['fileUploadData'].value = JSON.stringify(currentEntity)
    document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
    ceVisualizeEntity()

    // alert('Entity created.')
  } else if (action === 'viewEntity') {
    // alert(JSON.stringify(currentEntity))
  } else if (action === 'downloadEntity') {
    if (device.platform.toLowerCase() === 'android') {
      alert('ERROR: This functionality does not work in your browser.')
    } else {
      ceDownloadFile('Entity.cidme', JSON.stringify(currentEntity))
    }
  } else {
    alert('ERROR: UNKNOWN ACTION REQUESTED')
  }

  return true
}

function ceReadFile (fileName) {
  if (device.platform.toLowerCase() === 'browser') {
    alert('ERROR: This functionality does not work in the browser.')

    return false
  }

  readFromFile(fileName, function (data) {
    if (cidme.validate(JSON.parse(data)) === false) {
      alert('ERROR:  Invalid CIDME Entity uploaded.')
    } else {
      currentEntity = JSON.parse(data)
      document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
      ceVisualizeEntity()
    }
  })
}

function ceWriteFile (fileName) {
  if (device.platform.toLowerCase() === 'browser') {
    alert('ERROR: This functionality does not work in the browser.')

    return false
  }

  // writeToFile(fileName, JSON.stringify(cidme.createEntityResource()))
  writeToFile(fileName, JSON.stringify(currentEntity))
}

function ceDownloadFile (filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  // element.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

async function ceVisualizeEntity () {
  $('div#ce_entityView').replaceWith('<div id="ce_entityView"></div>')

  if (currentEntity === '' || cidme.validate(currentEntity) === false) { return false }

  await ceVisualizeCidmeResource(currentEntity, null)

  return true
}

async function ceVisualizeCidmeResource (cidmeResource, parentUri) {
  console.log('Visualizing: Type: ' + cidmeResource['@type'] + ', URI: ' + cidmeResource['@id'])

  /* ---------- */
  // Figure out the target div we're appending to...
  let targetDiv = ''
  if (cidmeResource['@type'] === 'Entity') {
    targetDiv = 'div#ce_entityView'
  } else if (cidmeResource['@type'] === 'EntityContext') {
    targetDiv = '#' + cidme.parseCidmeUri(parentUri)['id'] + '_entityContexts'
  } else if (cidmeResource['@type'] === 'EntityContextDataGroup') {
    targetDiv = '#' + cidme.parseCidmeUri(parentUri)['id'] + '_entityContextData'
  } else if (cidmeResource['@type'] === 'EntityContextLinkGroup') {
    targetDiv = '#' + cidme.parseCidmeUri(parentUri)['id'] + '_entityContextLinks'
  } else if (cidmeResource['@type'] === 'MetadataGroup') {
    targetDiv = '#' + cidme.parseCidmeUri(parentUri)['id'] + '_metadata'
  }
  /* ---------- */

  /* ---------- */
  // Create HTML for this resource
  let targetDivHtml = ''
  if (cidmeResource['@type'] === 'Entity') {
    targetDivHtml += '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '" class="ce_CidmeEntityResource"> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_control" class="ce_CidmeResourceControl"> ' +
        '</div> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_header" class="ce_CidmeEntityHeader"> ' +
            'Type: ' + cidmeResource['@type'] + '<br /> ' +
            'ID: ' + cidmeResource['@id'] + '<br /> ' +
        '</div>'
  } else if (cidmeResource['@type'] === 'EntityContext') {
    targetDivHtml += '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '" class="ce_CidmeEntityContextResource"> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_control" class="ce_CidmeResourceControl"> ' +
        '</div> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_header" class="ce_CidmeEntityContextHeader"> ' +
            'Type: ' + cidmeResource['@type'] + '<br /> ' +
            'ID: ' + cidmeResource['@id'] + '<br /> ' +
        '</div>'
  } else if (cidmeResource['@type'] === 'EntityContextDataGroup') {
    targetDivHtml += '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '" class="ce_CidmeEntityContextDataGroupResource"> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_control" class="ce_CidmeResourceControl"> ' +
          '</div> ' +
          '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_header" class="ce_CidmeMetadataGroupHeader"> ' +
              'Type: ' + cidmeResource['@type'] + '<br /> ' +
              'ID: ' + cidmeResource['@id'] + '<br /> ' +
          '</div>'
  } else if (cidmeResource['@type'] === 'EntityContextLinkGroup') {
    targetDivHtml += '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '" class="ce_CidmeEntityContextLinkGroupResource"> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_control" class="ce_CidmeResourceControl"> ' +
          '</div> ' +
          '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_header" class="ce_CidmeMetadataGroupHeader"> ' +
            'Type: ' + cidmeResource['@type'] + '<br /> ' +
            'ID: ' + cidmeResource['@id'] + '<br /> ' +
        '</div>'
  } else if (cidmeResource['@type'] === 'MetadataGroup') {
    targetDivHtml += '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '" class="ce_CidmeMetadataGroupResource"> ' +
        '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_control" class="ce_CidmeResourceControl"> ' +
          '</div> ' +
          '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_header" class="ce_CidmeMetadataGroupHeader"> ' +
            'Type: ' + cidmeResource['@type'] + '<br /> ' +
            'ID: ' + cidmeResource['@id'] + '<br /> ' +
      '</div>'
  }
  /* ---------- */

  /* ---------- */
  // Add CidmeData (for metadata, entityContextData, & entityContextLinks) HTML
  if (cidmeResource['@type'] === 'MetadataGroup' || cidmeResource['@type'] === 'EntityContextDataGroup' || cidmeResource['@type'] === 'EntityContextLinkGroup') {
    targetDivHtml += '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_groupDataType" class="ce_CidmeGroupDataType"> ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_data" class="ce_CidmeGroupDataType"> ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_dataAdd" class="ce_CidmeGroupDataTypeAdd"> ' +
      '</div>'
  }
  /* ---------- */

  /* ---------- */
  // Add metadata HTML
  targetDivHtml += '<br /> ' +
    '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_metadata_control"> ' +
      'Metadata: &nbsp; ' +
    '</div> ' +
    '<br /> ' +
    '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_metadata"> ' +
  '</div>'
  /* ---------- */

  /* ---------- */
  // Add entityContextData and entityContextLinks HTML
  if (cidmeResource['@type'] === 'EntityContext') {
    targetDivHtml += '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContextData_control"> ' +
        'EntityContextData: &nbsp; ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContextData"> ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContextLinks_control"> ' +
        'EntityContextLinks: &nbsp; ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContextLinks"> ' +
    '</div>'
  }
  /* ---------- */

  /* ---------- */
  // Add entityContexts HTML
  if (cidmeResource['@type'] === 'Entity' || cidmeResource['@type'] === 'EntityContext') {
    targetDivHtml += '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContexts_control"> ' +
        'EntityContexts: &nbsp; ' +
      '</div> ' +
      '<br /> ' +
      '<div id="' + cidme.parseCidmeUri(cidmeResource['@id'])['id'] + '_entityContexts"> ' +
    '</div>'
  }
  /* ---------- */

  // Add final end div tag
  targetDivHtml += '</div>'

  // Add the HTML to the target div
  $(targetDivHtml).appendTo(targetDiv)

  /* ---------- */
  // Add CidmeGroupDatatype (for metadata, entityContextData, & entityContextLinks) JS
  if (cidmeResource['@type'] === 'MetadataGroup' || cidmeResource['@type'] === 'EntityContextDataGroup' || cidmeResource['@type'] === 'EntityContextLinkGroup') {
    ceVisualizeEntityItemGroupDataType(cidmeResource, cidmeResource['@id'])
  }
  /* ---------- */

  /* ---------- */
  // Add CidmeData (for metadata, entityContextData, & entityContextLinks) JS
  if (cidmeResource['@type'] === 'MetadataGroup' || cidmeResource['@type'] === 'EntityContextDataGroup' || cidmeResource['@type'] === 'EntityContextLinkGroup') {
    ceVisualizeEntityItemData(cidmeResource, cidmeResource['@id'])
  }
  /* ---------- */

  /* ---------- */
  // Add metadata JS
  ceAddResourceControl(cidmeResource['@id'], 'metadata', true)

  if (cidmeResource.hasOwnProperty('metadata') && cidmeResource['metadata'].length > 0) {
    for (let i = 0; i < cidmeResource['metadata'].length; i++) {
      ceVisualizeCidmeResource(cidmeResource['metadata'][i], cidmeResource['@id'])
    }
  }
  /* ---------- */

  /* ---------- */
  // Add entityContextData and entityContextLinks JS
  if (cidmeResource['@type'] === 'EntityContext') {
    ceAddResourceControl(cidmeResource['@id'], 'entityContextData', true)
    if (cidmeResource.hasOwnProperty('entityContextData') && cidmeResource['entityContextData'].length > 0) {
      for (let i = 0; i < cidmeResource['entityContextData'].length; i++) {
        ceVisualizeCidmeResource(cidmeResource['entityContextData'][i], cidmeResource['@id'])
      }
    }

    ceAddResourceControl(cidmeResource['@id'], 'entityContextLinks', true)
    if (cidmeResource.hasOwnProperty('entityContextLinks') && cidmeResource['entityContextLinks'].length > 0) {
      for (let i = 0; i < cidmeResource['entityContextLinks'].length; i++) {
        ceVisualizeCidmeResource(cidmeResource['entityContextLinks'][i], cidmeResource['@id'])
      }
    }
  }
  /* ---------- */

  /* ---------- */
  // Add entityContexts JS
  if (cidmeResource['@type'] === 'Entity' || cidmeResource['@type'] === 'EntityContext') {
    ceAddResourceControl(cidmeResource['@id'], 'entityContexts', true)
    if (cidmeResource.hasOwnProperty('entityContexts') && cidmeResource['entityContexts'].length > 0) {
      for (let i = 0; i < cidmeResource['entityContexts'].length; i++) {
        ceVisualizeCidmeResource(cidmeResource['entityContexts'][i], cidmeResource['@id'])
      }
    }
  }
  /* ---------- */

  // Add the entity control JS
  ceAddResourceControl(cidmeResource['@id'])

  console.log('Visualized: Type: ' + cidmeResource['@type'] + ', URI: ' + cidmeResource['@id'])

  return true
}

function ceAddResourceControl (resourceUri, targetResourceType, isArrayOfItems) {
  if (!isArrayOfItems) { isArrayOfItems = false } else { isArrayOfItems = true }
  console.log('isArrayOfItems: ' + JSON.stringify(isArrayOfItems) + ' - ' + resourceUri)
  var resourceId = cidme.parseCidmeUri(resourceUri)['id']
  var resourceType = cidme.parseCidmeUri(resourceUri)['resourceType']
  if (isArrayOfItems === true) {
    if (targetResourceType === 'metadata') { resourceId += '_metadata' } else if (targetResourceType === 'entityContexts') { resourceId += '_entityContexts' } else if (targetResourceType === 'entityContextData') { resourceId += '_entityContextData' } else if (targetResourceType === 'entityContextLinks') { resourceId += '_entityContextLinks' } else { return false }
  }

  /* ---------- */
  // "Hide" Functionality

  // HTML
  $('<span id="' + resourceId + '_controlHide" class="ce_CidmeResourceHide"></span>').appendTo('#' + resourceId + '_control')

  // JS
  $(document).on('click', '#' + resourceId + '_controlHide', function () {
    $('#' + resourceId + '_controlHide').hide()
    $('#' + resourceId + '_controlShow').show()
    $('#' + resourceId + '_controlEditData').hide()
    $('#' + resourceId + '_controlEditGroupDataType').hide()

    if (isArrayOfItems === true) {
      $('#' + resourceId).hide()
    } else {
      $('#' + resourceId + '_header').hide()
      $('#' + resourceId + '_metadata_control').hide()
      $('#' + resourceId + '_metadata').hide()
      $('#' + resourceId + '_groupDataType').hide()
      $('#' + resourceId + '_data').hide()
      $('#' + resourceId + '_entityContexts_control').hide()
      $('#' + resourceId + '_entityContexts').hide()
      $('#' + resourceId + '_entityContextData_control').hide()
      $('#' + resourceId + '_entityContextData').hide()
      $('#' + resourceId + '_entityContextLinks_control').hide()
      $('#' + resourceId + '_entityContextLinks').hide()
    }

    // console.log('Clicked Hide');
  })
  /* ---------- */

  /* ---------- */
  // "Show" Functionality

  // HTML
  $('<span id="' + resourceId + '_controlShow" class="ce_CidmeResourceShow"></span>').appendTo('#' + resourceId + '_control')
  $('#' + resourceId + '_controlShow').hide()

  // JS
  $(document).on('click', '#' + resourceId + '_controlShow', function () {
    $('#' + resourceId + '_controlShow').hide()
    $('#' + resourceId + '_controlHide').show()
    $('#' + resourceId + '_controlEditData').show()
    $('#' + resourceId + '_controlEditGroupDataType').show()

    if (isArrayOfItems === true) {
      $('#' + resourceId).show()
    } else {
      $('#' + resourceId + '_header').show()
      $('#' + resourceId + '_metadata_control').show()
      $('#' + resourceId + '_metadata').show()
      $('#' + resourceId + '_groupDataType').show()
      $('#' + resourceId + '_data').show()
      $('#' + resourceId + '_entityContexts_control').show()
      $('#' + resourceId + '_entityContexts').show()
      $('#' + resourceId + '_entityContextData_control').show()
      $('#' + resourceId + '_entityContextData').show()
      $('#' + resourceId + '_entityContextLinks_control').show()
      $('#' + resourceId + '_entityContextLinks').show()
    }

    // console.log('Clicked Show');
  })
  /* ---------- */

  /* ---------- */
  // "Delete" functionality

  // HTML
  if (isArrayOfItems === false) {
    $('<span id="' + resourceId + '_controlDelete" class="ce_CidmeResourceDelete"></span>').appendTo('#' + resourceId + '_control')

    // Delete JS
    $(document).on('click', '#' + resourceId + '_controlDelete', function () {
      console.log('Clicked Delete')

      ceDelete(resourceUri)
    })
  }
  /* ---------- */

  /* ---------- */
  // "Add New" Functionality
  if (isArrayOfItems === true) {
    $('<span id="' + resourceId + '_controlAddNew" class="ce_CidmeResourceAddNew"></span>').appendTo('#' + resourceId + '_control')

    // JS
    $(document).on('click', '#' + resourceId + '_controlAddNew', function () {
      console.log('Clicked Add - ' + resourceType + ': ' + resourceUri)

      let newResource = null

      if (targetResourceType === 'metadata') {
        newResource = cidme.createMetadataGroupResource(resourceUri)
      } else if (targetResourceType === 'entityContexts') {
        newResource = cidme.createEntityContextResource(resourceUri)
      } else if (targetResourceType === 'entityContextData') {
        newResource = cidme.createEntityContextDataGroupResource(resourceUri)
      } else if (targetResourceType === 'entityContextLinks') {
        newResource = cidme.createEntityContextLinkGroupResource(resourceUri)
      }

      if (newResource !== null) {
        ceVisualizeCidmeResource(newResource, resourceUri)
        currentEntity = cidme.addResourceToParent(resourceUri, currentEntity, newResource)
        document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
      }
    })
  }
  /* ---------- */

  /* ---------- */
  // "Add Data" Functionality
  if (isArrayOfItems === false && (resourceType === 'MetadataGroup' || resourceType === 'EntityContextDataGroup' || resourceType === 'EntityContextLinkGroup')) {
    // HTML
    // $('<span id="' + resourceId + '_controlAddData" class="ce_CidmeResourceAddData"></span>').appendTo('#' + resourceId + '_control')
    $('<span id="' + resourceId + '_controlEditGroupDataType" class="ce_CidmeResourceEditGroupDataType"></span>').appendTo('#' + resourceId + '_control')
    $('<span id="' + resourceId + '_controlEditData" class="ce_CidmeResourceEditData"></span>').appendTo('#' + resourceId + '_control')

    // JS
    $(document).on('click', '#' + resourceId + '_controlEditData', function () {
      $('#' + resourceId + '_dataEdit').show()
      $('#' + resourceId + '_dataView').hide()
    })

    $(document).on('click', '#' + resourceId + '_controlEditGroupDataType', function () {
      $('#' + resourceId + '_groupDataTypeEdit').show()
      $('#' + resourceId + '_groupDataTypeView').hide()
    })


    // TODO TODO TODO
  }
  /* ---------- */

  return true
}

function ceDelete (resourceId) {
  document.getElementById('ce_entityData').value = JSON.stringify(cidme.deleteResource(resourceId, currentEntity), null, 2)

  $('#' + cidme.parseCidmeUri(resourceId)['id']).hide()
}

/*
function ceDeleteDataItemData (parentUri, i) {
  // TODO TODO TODO
  // Also remove RDF triple... from Entity JSON and ce_entityData...

  // document.getElementById('ce_entityData').value = JSON.stringify(cidme.deleteResource(resourceId, currentEntity), null, 2)

  $('#' + parentUri + '_data_' + i).hide()
}
 */

async function ceVisualizeEntityItemGroupDataType (cidmeResource, parentUri) {
  let tempData = ''
  if (cidmeResource.hasOwnProperty('groupDataType') && cidmeResource['groupDataType'].length > 0) {
    tempData = JSON.stringify(cidmeResource['groupDataType'], null, 2)
  }

  // HTML
  $('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit" class="ce_CidmeGroupDataTypeItemEdit"> ' +
      '<textarea id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_textarea" class="ce_CidmeGroupDataTypeItemTextarea">' + tempData + '</textarea><br />' +
      '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_cancel" class="ce_CidmeGroupDataTypeItemEditCancel"></span>' +
      '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_submit" class="ce_CidmeGroupDataTypeItemEditSubmit"></span>' +
    '</div>' +
    '<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeView" class="ce_CidmeGroupDataType">' +
    '</div>').appendTo('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataType')

  // JS
  $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit').hide()

  $(document).on('click', '#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_cancel', function () {
    $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit').hide()
    $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeView').show()
  })

  $(document).on('click', '#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_submit', function () {
    //currentEntity = cidme.replaceResourceData(parentUri, currentEntity, JSON.parse($('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_textarea').val()), cidmeResource['groupDataType'])
    currentEntity = cidme.replaceResourceData(parentUri, currentEntity, [], JSON.parse($('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeEdit_textarea').val()))

    document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
    ceVisualizeEntity()
    //$('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit').hide()
    //$('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView').show()

    // This may not work for all, some may take longer???
    setTimeout(() => {
      $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_controlShow').trigger('click')
    }, 1000)
  })

  if (cidmeResource.hasOwnProperty('groupDataType') && cidmeResource['groupDataType'].length > 0) {
    console.log('CIDME getResourceGroupDataTypeNQuads BEGIN')
    let nquads = await cidme.getResourceGroupDataTypeNQuads(cidmeResource, false)
    console.log('CIDME getResourceGroupDataTypeNQuads END')
    //console.log(JSON.stringify(nquads))

    var rdfUri = 'https://example.org/resource.ttl'
    var rdfBody = nquads
    var rdfMimeType = 'text/turtle'
    var rdfStore = $rdf.graph()

    console.log('RDF PARSE BEGIN')
    try {
        $rdf.parse(rdfBody, rdfStore, rdfUri, rdfMimeType)
    } catch (err) {
        console.log(err)
    }
    console.log('RDF PARSE END')

    console.log('RDF MATCH BEGIN')
    //console.log(JSON.stringify(rdfStore.match()))
    let nquadsArray = rdfStore.match()
    console.log('RDF MATCH END')

    if (typeof nquadsArray === 'object' && nquadsArray.length > 0) {
      $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeView').replaceWith('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeView" class="ce_CidmeGroupDataType">' +
      '</div>')

      for (let i = 0; i < nquadsArray.length; i++) {
            $('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataType_' + i + '" class="ce_CidmeGroupDataTypeItem"> ' +
                '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataType_' + i + '_itemData' + '" class="ce_CidmeGroupDataTypeItemView"> ' +
                  nquadsArray[i]['predicate']['value'] + ': ' + nquadsArray[i]['object']['value'] +
                '</span>' +
                '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataType_' + i + '_itemControl' + '" class="ce_CidmeGroupDataTypeItemControl"> ' +
                  '<!-- <span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataType_' + i + '_itemControlDelete' + '" class="ce_CidmeResourceDelete"></span> -->' +
                '</span>' +
              '</div>').appendTo('#' + cidme.parseCidmeUri(parentUri)['id'] + '_groupDataTypeView')

            if (nquadsArray[i]['predicate']['value'] === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && (
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/CreatedMetadata/CreatedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/ModifiedMetadata/ModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/LastModifiedMetadata/LastModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/CreatedMetadata/CreatedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/ModifiedMetadata/ModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/LastModifiedMetadata/LastModifiedMetadata.jsonld'
            )) {
              // console.log('SHOULD HIDE!')

              if (cidmeResource['@type'] === 'MetadataGroup') {
                $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_controlHide').click()
                // console.log('HIDE: ' + cidme.parseCidmeUri(parentUri)['id'])
              }
            } else {
              // console.log('NO HIDE!')
              // console.log(nquadsArray[i]['predicate']['value'])
              // console.log(nquadsArray[i]['object']['value'])
            }
          }
        }
  }

  return true
}

async function ceVisualizeEntityItemData (cidmeResource, parentUri) {
  let tempData = ''
  if (cidmeResource.hasOwnProperty('data') && cidmeResource['data'].length > 0) {
    tempData = JSON.stringify(cidmeResource['data'], null, 2)
  }

  // HTML
  $('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit" class="ce_CidmeDataItemEdit"> ' +
      '<textarea id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_textarea" class="ce_CidmeDataItemTextarea">' + tempData + '</textarea><br />' +
      '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_cancel" class="ce_CidmeDataItemEditCancel"></span>' +
      '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_submit" class="ce_CidmeDataItemEditSubmit"></span>' +
    '</div>' +
    '<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView" class="ce_CidmeData">' +
    '</div>').appendTo('#' + cidme.parseCidmeUri(parentUri)['id'] + '_data')

  // JS
  $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit').hide()

  $(document).on('click', '#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_cancel', function () {
    $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit').hide()
    $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView').show()
  })

  $(document).on('click', '#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_submit', function () {
    //currentEntity = cidme.replaceResourceData(parentUri, currentEntity, JSON.parse($('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_textarea').val()), cidmeResource['groupDataType'])
    currentEntity = cidme.replaceResourceData(parentUri, currentEntity, JSON.parse($('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit_textarea').val()))

    document.getElementById('ce_entityData').value = JSON.stringify(currentEntity, null, 2)
    ceVisualizeEntity()
    //$('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataEdit').hide()
    //$('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView').show()

    // This may not work for all, some may take longer???
    setTimeout(() => {
      $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_controlShow').trigger('click')
    }, 1000)

  })

  if (cidmeResource.hasOwnProperty('data') && cidmeResource['data'].length > 0) {
    /* ********************************************************************** */
    // JSON-LD PROCESSING

    let nquads = await cidme.getResourceDataNQuads(cidmeResource, false)
    //console.log(JSON.stringify(nquads))

    var rdfUri = 'https://example.org/resource.ttl'
    var rdfBody = nquads
    var rdfMimeType = 'text/turtle'
    var rdfStore = $rdf.graph()

    try {
        $rdf.parse(rdfBody, rdfStore, rdfUri, rdfMimeType)
    } catch (err) {
        console.log(err)
    }

    //console.log(JSON.stringify(rdfStore.match()))
    let nquadsArray = rdfStore.match()

    if (typeof nquadsArray === 'object' && nquadsArray.length > 0) {
      $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView').replaceWith('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView" class="ce_CidmeData">' +
      '</div>')

      for (let i = 0; i < nquadsArray.length; i++) {

            $('<div id="' + cidme.parseCidmeUri(parentUri)['id'] + '_data_' + i + '" class="ce_CidmeDataItem"> ' +
                '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_data_' + i + '_itemData' + '" class="ce_CidmeDataItemView"> ' +
                  nquadsArray[i]['predicate']['value'] + ': ' + nquadsArray[i]['object']['value'] +
                '</span>' +
                '<span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_data_' + i + '_itemControl' + '" class="ce_CidmeDataItemControl"> ' +
                  '<!-- <span id="' + cidme.parseCidmeUri(parentUri)['id'] + '_data_' + i + '_itemControlDelete' + '" class="ce_CidmeResourceDelete"></span> -->' +
                '</span>' +
              '</div>').appendTo('#' + cidme.parseCidmeUri(parentUri)['id'] + '_dataView')

            if (nquadsArray[i]['predicate']['value'] === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && (
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/CreatedMetadata/CreatedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/ModifiedMetadata/ModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.3.0/LastModifiedMetadata/LastModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/CreatedMetadata/CreatedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/ModifiedMetadata/ModifiedMetadata.jsonld' ||
              nquadsArray[i]['object']['value'] === 'http://cidme.net/vocab/core/0.4.0/LastModifiedMetadata/LastModifiedMetadata.jsonld'
            )) {
              // console.log('SHOULD HIDE!')

              if (cidmeResource['@type'] === 'MetadataGroup') {
                $('#' + cidme.parseCidmeUri(parentUri)['id'] + '_controlHide').click()
                // console.log('HIDE: ' + cidme.parseCidmeUri(parentUri)['id'])
              }
            } else {
              // console.log('NO HIDE!')
              // console.log(nquadsArray[i]['predicate']['value'])
              // console.log(nquadsArray[i]['object']['value'])
            }
        }
    }

    /* ********************************************************************** */
  }

  return true
}

function readFromFile (fileName, cb) {
  var pathToFile = cordova.file.externalRootDirectory + fileName
  window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader()

      // reader.onloadend = function (e) {
      reader.onloadend = function () {
        cb(JSON.parse(this.result))
      }

      reader.readAsText(file)
    }, errorHandler.bind(null, fileName))
  }, errorHandler.bind(null, fileName))
}

function writeToFile (fileName, data) {
  data = JSON.stringify(data, null, '\t')
  window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (directoryEntry) {
    directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        // fileWriter.onwriteend = function (e) {
        fileWriter.onwriteend = function () {
          // for real-world usage, you might consider passing a success callback
          console.log('Write of file "' + fileName + '"" completed.')
        }

        fileWriter.onerror = function (e) {
          // you could hook this up with our global error handler, or pass in an error callback
          console.log('Write failed: ' + e.toString())
        }

        var blob = new Blob([data], { type: 'text/plain' })
        fileWriter.write(blob)
      }, errorHandler.bind(null, fileName))
    }, errorHandler.bind(null, fileName))
  }, errorHandler.bind(null, fileName))
}

function errorHandler (fileName, e) {
  var msg = ''

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Storage quota exceeded'
      break
    case FileError.NOT_FOUND_ERR:
      msg = 'File not found'
      break
    case FileError.SECURITY_ERR:
      msg = 'Security error'
      break
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Invalid modification'
      break
    case FileError.INVALID_STATE_ERR:
      msg = 'Invalid state'
      break
    default:
      msg = 'Unknown error'
      break
  };

  console.log('Error (' + fileName + '): ' + msg)
  alert('Error (' + fileName + '): ' + msg)
}