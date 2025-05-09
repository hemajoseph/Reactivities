using System;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>>
    { }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            /*  try  //Commenting after cancellationToken testing. The block was just for the cancellation token testing 
             {
                 for (int i = 0; i < 10; i++)
                 {
                     cancellationToken.ThrowIfCancellationRequested();
                     await Task.Delay(1000, cancellationToken);
                     logger.LogInformation($"Task {i} completed.");
                 }

             }
             catch (Exception ex)
             {
                 logger.LogWarning("Task was cancelled: {Message}", ex.Message);
             } */
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }


}
