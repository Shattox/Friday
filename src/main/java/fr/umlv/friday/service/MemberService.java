package fr.umlv.friday.service;

import fr.umlv.friday.model.Member;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class MemberService {
    @Inject
    EntityManager entityManager;

    /**
     * Create a query to add a new member.
     * @param member the new member to add in the database.
     */
    @Transactional
    public void saveMember(Member member) {
        var query = "INSERT INTO member (id, firstName, lastName, email, password) VALUES" +
                "(NEXT VALUE FOR seq_member, ?, ?, ?, ?)";
        entityManager.createNativeQuery(query)
                .setParameter(1, member.getFirstName())
                .setParameter(2, member.getLastName())
                .setParameter(3, member.getEmail())
                .setParameter(4, member.getPassword())
                .executeUpdate();
    }

    /**
     * Save a member in the database.
     */
    @Transactional
    public void registerMember(String firstName, String lastName, String email, String password) {
        var member = new Member(firstName, lastName, email, password);
        saveMember(member);
    }

    /**
     * Get a member if exists by his email and password.
     * @param email member email.
     * @param password member password.
     * @return the member.
     */
    public Member getMember(String email, String password) {
        return entityManager.createQuery(
                "SELECT m FROM Member m WHERE m.email=?1 AND m.password=?2", Member.class)
                .setParameter(1, email)
                .setParameter(2, password)
                .getSingleResult();
        }
}
