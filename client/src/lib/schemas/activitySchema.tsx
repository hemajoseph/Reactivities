import {z} from 'zod';

//Create a string validation fn so we dont need to type in th e z.string and then .min etc for each control
const requiredString = (fieldName: string) => z.string({required_error: `${fieldName} is required`}).min(1, {message: `${fieldName} is required`});      

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: 'Invalid date format. Please use a valid date.'
    }), //requiredString('Date'),
    location: z.object({
        city: requiredString('City'),
        venue: requiredString('Venue'),
        latitude: z.number().optional(),
        longitude: z.number().optional()
    })
});    




export type ActivitySchema = z.infer<typeof activitySchema>;
