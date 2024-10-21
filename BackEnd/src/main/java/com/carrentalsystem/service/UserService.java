package com.carrentalsystem.service;

import java.util.List;

import com.carrentalsystem.dto.UpdateUserRequestDto;
import com.carrentalsystem.entity.User;

public interface UserService {

	User addUser(User user);

	User updateUser(User user);

	User getUserByEmailAndStatus(String emailId, String status);

	User getUserByEmailid(String emailId);

	List<User> getUserByRole(String role);

	User getUserById(int userId);

	User getUserByEmailIdAndRoleAndStatus(String emailId, String role, String status);

	List<User> updateAllUser(List<User> users);
	
	User updateUserDetails(UpdateUserRequestDto updateUserRequestDto);

	List<User> getUserByRoleAndStatus(String role, String status);

}