<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'firstname' => 'required',
            'id_departments' => 'required',
            'id_societies' => 'required',
            'id_work_hours' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $employee = new Employee();
            $employee->name = $request->input('name');
            $employee->firstname = $request->input('firstname');
            $employee->id_departments = $request->input('id_departments');
            $employee->id_societies = $request->input('id_societies');
            $employee->id_work_hours = $request->input('id_work_hours');
            $employee->save();

            return response()->json(['message' => 'Employee created successfully'], 201);
        } catch (\Exception $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1452) {
      
                return response()->json(['message' => 'Invalid workhour, society, or department ID'], 400);
            } else {
   
                return response()->json(['message' => 'Failed to create employee. Error: ' . $e->getMessage()], 500);
            }
        }
    }    

    public function show($id)
    {
        return Employee::find($id);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        $employee->name = $request->input('name');
        $employee->firstname = $request->input('firstname');
        $employee->id_departments = $request->input('id_departments');
        $employee->id_societies = $request->input('id_societies');
        $employee->id_work_hours = $request->input('id_work_hours');
        $employee->save();

        return response()->json(['message' => 'Employee updated successfully'], 200);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
