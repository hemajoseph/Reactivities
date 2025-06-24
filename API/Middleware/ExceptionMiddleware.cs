using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex) //From FluentValidation
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            //Console.WriteLine(ex);
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsJsonAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();
        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                    //[..existingErrors,error.ErrorMessage]; Collection expressions to replace this in C#9

                }
                else
                {
                    validationErrors[error.PropertyName] = new[] { error.ErrorMessage };
                }

            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Type = "ValidationFailure",
            Title = "Validation errors happnd.",
            Status = StatusCodes.Status400BadRequest,
            Instance = context.Request.Path,
            Detail = "One or more validation errors occurred."
        };
        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}

