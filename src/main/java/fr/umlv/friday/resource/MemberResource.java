package fr.umlv.friday.resource;

import fr.umlv.friday.model.Member;
import fr.umlv.friday.service.MemberService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MemberResource {
    @Inject
    MemberService memberService;

    @POST
    @Path("SignUp/{firstName}&{lastName}&{email}&{password}")
    public Response registerMember(@PathParam("firstName") String firstName, @PathParam("lastName") String lastName,
                                 @PathParam("email") String email, @PathParam("password") String password) {
        memberService.registerMember(firstName, lastName, email, password);
        return Response.ok(200).build();
    }

    @POST
    @Path("SignIn/{email}&{password}")
    public Member verifyMember(@PathParam("email") String email, @PathParam("password") String password) {
        return memberService.getMember(email, password);
    }
}
