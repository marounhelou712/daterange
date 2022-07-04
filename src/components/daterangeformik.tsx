import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import  {Button} from "@mui/material";
import {Grid, Container} from "@mui/material";
import {Formik, Form, Field, useField, ErrorMessage} from 'formik';
import * as Yup from 'yup';


const DateRangeFilter = () => {


  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);


  const handleOnChange = (ranges: any) => {
    const { selection } = ranges;
    setState([selection]); 
  };


  const initialValues ={
    startDate: '',
    endDate: '',
  }

  const formValidation = Yup.object().shape({
    startDate: Yup.date(),
    endDate: Yup.date(),
  })

  return (
    <Grid container>
        <Grid item xs={12}>
            <Container> 

                <div>

                    <Formik
                        initialValues={{...initialValues}}
                        validationSchema={formValidation}
                        onSubmit = {values => {
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Grid item>
                                <DateRangePicker
                                    onChange={handleOnChange}
                                    className="form-control"
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    ranges={state}
                                    minDate={addDays(new Date(), -300)}
                                    maxDate={addDays(new Date(), 900)}
                                    direction="horizontal"
                                    preventSnapRefocus={true}
                                    calendarFocus="backwards"
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit">Show</Button>
                            </Grid>
                        </Form>
                    </Formik>
                </div>
            </Container>
        </Grid>
    </Grid>
  );
};

export default DateRangeFilter;

