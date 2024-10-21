package com.carrentalsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrentalsystem.dao.UserDao;
import com.carrentalsystem.dto.UpdateUserRequestDto;
import com.carrentalsystem.entity.Address;
import com.carrentalsystem.entity.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AddressService  addressService;

	@Override
	public User addUser(User user) {
		return userDao.save(user);
	}

	@Override
	public User updateUser(User user) {
		return userDao.save(user);
	}

	@Override
	public User getUserByEmailAndStatus(String emailId, String status) {
		return userDao.findByEmailIdAndStatus(emailId, status);
	}

	@Override
	public User getUserByEmailid(String emailId) {
		return userDao.findByEmailId(emailId);
	}

	@Override
	public List<User> getUserByRole(String role) {
		return userDao.findByRole(role);
	}

	@Override
	public User getUserById(int userId) {

		Optional<User> optionalUser = this.userDao.findById(userId);

		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			return null;
		}

	}
	
	
	// In UserServiceImpl.java
	@Override
	public User updateUserDetails(UpdateUserRequestDto updateUserRequestDto) {
	    Optional<User> optionalUser = userDao.findById(updateUserRequestDto.getUserId());
	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();
	        user.setEmailId(updateUserRequestDto.getEmailId());
	        user.setFirstName(updateUserRequestDto.getFirstName());
	        user.setLastName(updateUserRequestDto.getLastName());
	        user.setPhoneNo(updateUserRequestDto.getPhoneNumber());

	        // Address Update
	        Address address = user.getAddress();
	        if (address == null) {
	            address = new Address();
	        }
	        address.setStreet(updateUserRequestDto.getStreet());
	        address.setCity(updateUserRequestDto.getCity());
	        address.setPincode(updateUserRequestDto.getPincode());

	        address = addressService.updateAddress(address);
	        user.setAddress(address);

	        return userDao.save(user);
	    }
	    return null;
	}


	
	
	
	@Override
	public User getUserByEmailIdAndRoleAndStatus(String emailId, String role, String status) {
		return this.userDao.findByEmailIdAndRoleAndStatus(emailId, role, status);
	}

	@Override
	public List<User> updateAllUser(List<User> users) {
		return this.userDao.saveAll(users);
	}

	@Override
	public List<User> getUserByRoleAndStatus(String role, String status) {
		return this.userDao.findByRoleAndStatus(role, status);
	}
	
}
