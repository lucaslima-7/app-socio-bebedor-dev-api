create database socio_bebedor_dev

create table teams (
	id bigint auto_increment not null,
    `name` varchar(255) not null,
    state varchar(2) not null,
    primary key(id)
);

create table competitions (
	id bigint auto_increment not null,
    `name` varchar(255) not null,
    initialDate datetime(3) not null,
    endDate datetime(3) not null,
    primary key(id)
);

create table users (
	id bigint auto_increment primary key not null,
    federalId varchar(11),
    email varchar(255) not null,
	`password` varchar(255) not null,
    firstName varchar(20) not null,
    lastName varchar(255) not null,
    createdDate timestamp default now(),
    modifiedDate timestamp default now() on update now(),
    ddi varchar(3) default "+55" not null,
    ddd varchar(2) not null,
    mobilePhone varchar(9) not null,
    profilePic varchar(255),
    birthDate datetime(3) not null,
    `active` bit(1) not null,
    gender enum("M", "F")
);

create table addresses (
	id bigint auto_increment not null,
    `name` varchar(30),
    `type` enum('home', 'work', 'other'),
    zipCode varchar(8) not null,
    address1 varchar(255) not null,
    `number` int not null,
    neighboorhood varchar(255),
    address2 varchar(255),
    city varchar(255),
    state varchar(255),
    country varchar(255),
    created_date timestamp default now(),
    primary key(id)
);

create table users_addresses (
	id bigint auto_increment not null,
    userId bigint not null,
    addressId bigint not null,
    primary key(id)
);

create table users_team (
	id bigint auto_increment not null,
    userId bigint not null,
    teamId bigint not null,
    primary key(id)
);

create table users_plan (
	id bigint auto_increment not null,
    userId bigint not null,
    planId bigint not null,
    primary key(id)
);

create table teams_in_competitions (
	id bigint auto_increment not null,
    teamId bigint not null,
    competitionId bigint not null,
    primary key(id)
);

/* 

create table user_cards (
	
); 

create table payments (

)

create table matchdays (
	id bigint auto_increment not null,
    
    primary key(id)
);

create table couriers (
	
);

create table providers (

);

create table products (

);

create table boxes (

);

create table plans (

);

*/