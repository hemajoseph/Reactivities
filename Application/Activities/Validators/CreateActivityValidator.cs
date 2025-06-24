using System;
using Application.Activities.Commnds;
using Application.Activities.DTOs;
using FluentValidation;
namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidtor<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {
        
    }
}
