package cybercafe.Controller;


import cybercafe.Model.TimeCalculation;
import cybercafe.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    LoginService loginService;


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> userInput) {
        return loginService.login(userInput);
    }

    @PostMapping("/saveLoginTime")
    public TimeCalculation saveLoginTime(@RequestBody TimeCalculation timeCalculation){
        return loginService.saveLoginTime(timeCalculation);
    }

    @PutMapping("/logout")
    public TimeCalculation logout(@RequestBody Map<String ,String> userDeatils){
        return loginService.logout(userDeatils);
    }

    @GetMapping("/getAllUserDetails")
    public List<TimeCalculation> getAllUserDetails(){
        return loginService.getAllUserDetails();
    }


    @PutMapping("/paymentMode")
    public Map<String,String> paymentMode(@RequestBody Map<String,String> userData){
        return loginService.paymentMode(userData);
    }
}
