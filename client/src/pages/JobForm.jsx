import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import api from '../utils/api.js';

const jobSchema = yup.object().shape({
    company : yup.string().required("Company is required"),
    position : yup.string().required("Position is required"),
    status: yup.string().oneOf(["pending", "interview", "declined"])
});

const JobForm = ({ onJobCreated, editingJob, onCancelEdit }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
        setValue
    } = useForm({
        resolver : yupResolver(jobSchema),
    });
    useEffect(()=>{
        if(editingJob){
            setValue("company", editingJob.company);
            setValue("position", editingJob.position);
            setValue("status", editingJob.status);
        }
        else{
            reset();
        }
    },[editingJob, setValue, reset]);

    const onSubmit = async (data)=>{
        try {
            if(editingJob){
                const res = await api.put(`/job/update/${editingJob.id}`, data);
                console.log("Job Updated", res);
                onJobCreated();
                reset();
                onCancelEdit()
            } else {
                const res =  await api.post("/job/create", data);
                console.log("Job Created", res);
                onJobCreated();
                reset();    
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };


  return (
    <div>
        <form
         action=""
         onSubmit={handleSubmit(onSubmit)}
         className='flex flex-col gap-3'
        >
            <input
             type="text"
             placeholder='Company'
             {...register("company")}
             className='border p-2 rounded'
            />
            {errors.company && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}

            <input
             type="text"
             placeholder='Position'
             {...register("position")}
             className='border p-2 rounded'
            />
            {errors.position && (
                <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
            {editingJob && (
                <select
                  {...register("status")}
                  className="border p-2 rounded"
                >
                    <option>--Select Status--</option>
                    <option value="interview">Interview</option>
                    <option value="declined">Declined</option>
                </select>
            )}
            <button
             type='submit'
             className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
            >
                {editingJob ? "Update" : "Submit"}
            </button>
        </form>
    </div>
  )
}

export default JobForm
