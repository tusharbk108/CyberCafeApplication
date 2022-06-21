package cybercafe.Service;


import cybercafe.Model.RegistrationModel;
import cybercafe.Repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
public class RegistrationService {

    @Autowired
    RegisterRepo registerRepo;

    public RegistrationModel RegisterUser(RegistrationModel registrationModel) {

        return registerRepo.save(registrationModel);
    }

    public Map<String,String> uploadimage(MultipartFile file, String email) throws IOException {
       RegistrationModel registrationModel= registerRepo.findByEmail(email);
        Map<String,String > map = new HashMap<>();

        try {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            registrationModel.setPhotofilename(filename);
            registrationModel.setPhotodata(file.getBytes());
            registerRepo.save(registrationModel);
            map.put("status","Success");
            return map;
        } catch (Throwable th) {
            th.printStackTrace();
            map.put("status","Failure");
            return map;
        }

    }

    public Optional<RegistrationModel> GetAllDetails(int id) {

        return registerRepo.findById(id);
    }

    public Map<String,String> uploadId(MultipartFile file, String email) {
        RegistrationModel registrationModel= registerRepo.findByEmail(email);
        Map<String,String > map = new HashMap<>();
        try {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            registrationModel.setIDfilename(filename);
            registrationModel.setIDdata(file.getBytes());
            registerRepo.save(registrationModel);
            map.put("status","Success");
            return map;
        } catch (Throwable th) {
            th.printStackTrace();
            map.put("status","Failure");
            return map;
        }

    }

    public Map<String, String> checkEmailExistOrNot(String email) {
        RegistrationModel found = registerRepo.findByEmail(email);
      Map<String,String > response = new HashMap<>();
        if (!(found == null)){
            response.put("status","Exist");
            return response;
        }else {
            response.put("status","Not-Exist");
            return response;
        }

    }

    public Map<String, String> isUsernameAvailable(String username) {
        RegistrationModel found = registerRepo.findByUsername(username);
        Map<String,String > response = new HashMap<>();
        if (found == null){
            response.put("status","available");
            return response;
        }else {
            response.put("status","Not-available");
            return response;
        }

    }
}
