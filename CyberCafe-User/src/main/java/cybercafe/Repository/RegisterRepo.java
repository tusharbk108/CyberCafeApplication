package cybercafe.Repository;


import cybercafe.Model.RegistrationModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterRepo extends JpaRepository<RegistrationModel , Integer> {

    RegistrationModel findByEmail(String email);

    RegistrationModel findByUsername(String username);
}
