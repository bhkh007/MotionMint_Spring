package com.carrentalsystem.service;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@SuppressWarnings("unused")
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            // Create a new JavaMailSender instance
            JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();
            mailSenderImpl.setHost("smtp.gmail.com");
            mailSenderImpl.setPort(587);
            mailSenderImpl.setUsername("parasseth16121999@gmail.com");
            mailSenderImpl.setPassword("qvmgcqkcfwhzrdce");

            // Set properties
            Properties props = mailSenderImpl.getJavaMailProperties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.starttls.required", "true");
            props.put("mail.smtp.connectiontimeout", "5000");
            props.put("mail.smtp.timeout", "5000");
            props.put("mail.smtp.writetimeout", "5000");

            // Create and send the email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSenderImpl.send(message);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
        }
    }
}
