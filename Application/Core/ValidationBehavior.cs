using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    /// <summary>   /// Validates the request using the provided validator, if any, and then calls the next piece 
    /// //of middleware in the pipeline. This basically intercepts a requests to do the validation and continue with the next after the validation
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator is not null)
        {
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
        }

        return await next(); //If validator is null, then call next piece of request int he middleware
    }
}
