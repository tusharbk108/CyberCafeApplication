package cybercafe.Model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "RegistrationDetails")
public class RegistrationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String email;
    private String username;
    private String password;
    private String photofilename;
    @Lob
    private byte[] photodata;
    private String IDfilename;
    @Lob
    private byte[] IDdata;


    public RegistrationModel() {
    }

}



