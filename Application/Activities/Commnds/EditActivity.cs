using System;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commnds;

public class EditActivity
{

    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(new object[] { request.ActivityDto.Id }, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404); ;

            /* activity.Title = request.Activity.Title;
            activity.Description = request.Activity.Description;
            activity.Date = request.Activity.Date;
            activity.Category = request.Activity.Category;
            activity.City = request.Activity.City;
            activity.Venue = request.Activity.Venue; */

            mapper.Map(request.ActivityDto, activity); //automapper

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
