import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import MapComponent from "../../../app/shared/components/MapComponent";
import { useState } from "react";
import { Activity } from "../../../lib/types";

type Props = {
    activity: Activity
}

export default function ActivityDetailsInfo({activity} : Props) {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <Paper sx={{ mb: 2 }}>

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.date}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11} display='flex' justifyContent="space-between">
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button onClick={() => setMapOpen(!mapOpen)} sx={{display: 'flex', alignitems:'center'}}>
                        {mapOpen ? 'Hide Map' : 'Show Map'}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen && (
                    <Box sx={{ height: 300, zIndex: '1000', display: 'block'}} >
                        <MapComponent position={[activity.latitude, activity.latitude]}
                            venue={activity.venue}
                        />
                    </Box>
            )}
        </Paper>
    )
}