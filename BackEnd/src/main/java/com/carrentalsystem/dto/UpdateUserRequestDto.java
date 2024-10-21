package com.carrentalsystem.dto;

public class UpdateUserRequestDto {

	 private int userId;
	    private String emailId;
	    private String firstName;
	    private String lastName;
	    private String phoneNumber;
	    private String street;
	    private String city;
	    private int  pincode;
	    
	    
	    
		public int getUserId() {
			return userId;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public String getEmailId() {
			return emailId;
		}
		public void setEmailId(String emailId) {
			this.emailId = emailId;
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
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getStreet() {
			return street;
		}
		public void setStreet(String street) {
			this.street = street;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public int getPincode() {
			return pincode;
		}
		public void setPincode(int pincode) {
			this.pincode = pincode;
		}
		@Override
		public String toString() {
			return "UpdateUserRequestDto [userId=" + userId + ", emailId=" + emailId + ", firstName=" + firstName
					+ ", lastName=" + lastName + ", phoneNumber=" + phoneNumber + ", street=" + street + ", city="
					+ city + ", pincode=" + pincode + "]";
		}

		
   
}
