package com.carrentalsystem.entity;

//import java.util.ArrayList;
//import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;


import jakarta.persistence.OneToOne;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(unique = true)
	private String emailId;

	private String firstName;

	private String lastName;


	@JsonIgnore
	private String password;

	@Column(unique = true)
	private String phoneNo;

	private String role;
	
	private String status;
	
//	@OneToMany(mappedBy="customer")
//	private List<Payment>payments=new ArrayList();

	@OneToOne
	@JoinColumn(name = "address_id",referencedColumnName = "id"	)
	private Address address;


	@OneToOne
	@JoinColumn(name = "license_id")
	private DrivingLicense license;

	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public DrivingLicense getLicense() {
		return license;
	}

	public void setLicense(DrivingLicense license) {
		this.license = license;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", emailId=" + emailId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", password=" + password + ", phoneNo=" + phoneNo + ", role=" + role + ", status=" + status
				+ ", address=" + address + ", license=" + license + "]";
	}


	
	
	
}

	
	
	
	
