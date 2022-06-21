package cybercafe.Service;



import cybercafe.Model.RegistrationModel;
import cybercafe.Model.TimeCalculation;
import cybercafe.Model.UserLogoutResponse;
import cybercafe.Repository.RegisterRepo;
import cybercafe.Repository.TimeCalculationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class LoginService {

    @Autowired
    RegisterRepo registerRepo;

    @Autowired
    TimeCalculationRepo timeCalculationRepo;

    @Autowired
    private RestTemplate restTemplate;

    public Map<String, String> login(Map<String, String> userInput) {
        String username = userInput.get("username");
        String password = userInput.get("password");
        Map<String, String> response = new HashMap<String, String>();
        try {
            RegistrationModel registrationModel = registerRepo.findByUsername(username);
            if(username.equals("admin")){
                if (registrationModel.getUsername().equals(username) && registrationModel.getPassword().equals(password)) {
                    response.put("status", "valid-admin");
                    return response;
                }
            }else if (registrationModel.getUsername().equals(username) && registrationModel.getPassword().equals(password)) {
                        response.put("status", "valid-user");
                        return response;
            }else {
                response.put("status", "Incorrect credentials");

            }
        } catch (Exception e) {
            response.put("status", "User doesn't exist");
            return response;
        }
        return response;
    }

    public TimeCalculation logout(Map<String ,String > userDetails) {
        TimeCalculation timeCalculation = timeCalculationRepo.findAll().stream()
                .filter(timeCalculation1 -> timeCalculation1.getUsername().equals(userDetails.get("username")))
                .max(Comparator.comparingInt(TimeCalculation::getId)).orElseThrow();
        String response = null;


        timeCalculation.setLogoutTime(userDetails.get("logoutTime"));
        timeCalculation.setTimeUtilized(userDetails.get("timeUtilized"));

        String timeUtilized = userDetails.get("timeUtilized");
        String[] split = timeUtilized.split(":");
        int hr = Integer.parseInt(split[0]);
        int min = Integer.parseInt(split[1]);
        int sec = Integer.parseInt(split[2]);

        int amount =0;
        int amountPerHr = 60;

        System.out.println(hr +":"+min+":"+sec);
        if(hr!=0){
            amount += hr * amountPerHr;
        }
        if(min!=0){
            amount += min * (amountPerHr/60);
        }
        timeCalculation.setName(registerRepo.findByUsername(userDetails.get("username")).getName());
        timeCalculation.setAmount(amount);
        TimeCalculation save = timeCalculationRepo.save(timeCalculation);

        restTemplate.getForObject(
                "http://localhost:8082/userLogout/{username}",
                UserLogoutResponse.class,
                userDetails.get("username")
        );

        return save;

    }

    public TimeCalculation saveLoginTime(TimeCalculation timeCalculation) {
        return timeCalculationRepo.save(timeCalculation);
    }

    public List<TimeCalculation> getAllUserDetails() {
        return timeCalculationRepo.findAll();
    }

    public Map<String,String> paymentMode(Map<String, String> userData) {
        Map<String,String> response = new HashMap<>();
        Integer id = Integer.valueOf(userData.get("userId"));
        System.out.println(id);
        TimeCalculation userPaymentMode = timeCalculationRepo.
                findById(id).orElseThrow();

        userPaymentMode.setPaymentMode(userData.get("mode"));
        timeCalculationRepo.save(userPaymentMode);
        response.put("status","success");
        System.out.println(userPaymentMode);
        return response;
    }
}
