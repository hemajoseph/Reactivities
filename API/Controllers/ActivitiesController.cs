using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;
using Application.Activities.Commnds;
using Application.Activities.DTOs;

namespace API.Controllers
{

    public class ActivitiesController() : BaseApiController  //primnary ctor
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            // return await context.Activities.ToListAsync();
            return await Mediator.Send(new GetActivityList.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
             //var activity = await context.Activities.FindAsync(id);
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(string id, EditActivityDto activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));

        }

    }
}
