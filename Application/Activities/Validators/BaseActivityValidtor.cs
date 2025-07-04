using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidtor<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidtor(Func<T, TDto> selector)
    {
       RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required.");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required.");
        RuleFor(x => selector(x).Category).NotEmpty().WithMessage("Category is required.");
        RuleFor(x => selector(x).Date).GreaterThan(DateTime.UtcNow).WithMessage("Date should not be in the past.");
        RuleFor(x => selector(x).City).NotEmpty().WithMessage("City is required.");
        RuleFor(x => selector(x).Venue).NotEmpty().WithMessage("Venue is required.");
        RuleFor(x => selector(x).Latitude)
                .NotEmpty().WithMessage("City is required.")
                .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 amd 90.");
        RuleFor(x => selector(x).Longitude).InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 amd 180.");
    }

}
