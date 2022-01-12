package fr.umlv.friday.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import fr.umlv.friday.model.Member;
import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@QuarkusTest
@TestTransaction
public class MemberServiceTest {
    @Inject
    MemberService memberService;
    @Inject
    EntityManager entityManager;

    @Test
    public void memberIsCorrectlySave() {
        var memberBefore = getMembers();
        assertEquals(2, memberBefore.size());
        var member = new Member("jean", "paul", "jean.paul@outlook.fr", "pass");
        memberService.saveMember(member);
        var memberAfter = getMembers();
        assertEquals(3, memberAfter.size());
    }

    @Test
    public void getCorrectMember() {
        var member = memberService.getMember("steve.chen@mail.fr", "friday");
        assertEquals(101, member.getId());
        assertEquals("steve", member.getFirstName());
        assertEquals("chen", member.getLastName());
        assertEquals("steve.chen@mail.fr", member.getEmail());
        assertEquals("friday", member.getPassword());
    }

    private List<Member> getMembers() {
        return entityManager.createQuery("SELECT m FROM Member as m", Member.class).getResultList();
    }
}
