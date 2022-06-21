package cybercafe.Repository;


import cybercafe.Model.TimeCalculation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeCalculationRepo extends JpaRepository<TimeCalculation,Integer> {
    TimeCalculation findByUsername(String username);
}
