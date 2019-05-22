package com.kty.ebook.utils;

import com.sun.mail.util.MailSSLSocketFactory;

import java.util.ArrayList;
import java.lang.Iterable;
import java.util.List;
import java.util.Random;
import java.util.Properties;
import java.util.UUID;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message.RecipientType;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Utils {
    public static <T> List<T> it2List(Iterable<T> iter) {
        List<T> copy = new ArrayList<T>();
        iter.forEach(it->{copy.add(it);});
        return copy;
    }

    public static String randomNumber(int num) {
        if (num <= 0) {
            return null;
        }
        Random random = new Random();
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < num; i++) {
            result.append(random.nextInt(10));
        }
        return result.toString();
    }

    public static boolean sendMail(String to, String code) {

        try {
            Properties props = new Properties();
            // 发送服务器需要身份验证
            props.setProperty("mail.smtp.auth", "true");
            props.put("username", "3534679530@qq.com");
            props.put("password", "jfddzzkpexmqdaid");
            props.put("mail.transport.protocol", "smtp" );
            props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.setProperty("mail.smtp.socketFactory.port", "465");
            props.put("mail.host", "smtp.qq.com");
            props.put("mail.smtp.port", "465" );

            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            props.put("mail.smtp.ssl.enable", "true");
            props.put("mail.smtp.ssl.socketFactory", sf);

            Session mailSession = Session.getInstance(props);

            Message msg = new MimeMessage(mailSession);
            msg.setFrom(new InternetAddress("3534679530@qq.com"));
            msg.addRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            msg.setSubject("激活邮件");
            msg.setContent("<h1>此邮件为官方激活邮件！请点击下面链接完成激活操作！</h1><h3><a href='http://47.103.0.246:8080/api/user/activate?code="+code+"'>点击此激活客天涯购书网账号</a></h3>","text/html;charset=UTF-8");
            msg.saveChanges();

            Transport transport = mailSession.getTransport("smtp");
            transport.connect(props.getProperty("mail.host"), props
                    .getProperty("username"), props.getProperty("password"));
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            return false;
        }
        return true;
    }
}
