using System;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities.Commnds;

public class EditActivity
{

    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken);

            if (activity == null) throw new Exception("Activity not found");

            /* activity.Title = request.Activity.Title;
            activity.Description = request.Activity.Description;
            activity.Date = request.Activity.Date;
            activity.Category = request.Activity.Category;
            activity.City = request.Activity.City;
            activity.Venue = request.Activity.Venue; */

            mapper.Map(request.Activity, activity); //automapper

            await context.SaveChangesAsync(cancellationToken);
            return;
        }
    }
}
