import React, { useState } from "react";

export interface CVState {
	cvs: any[];
	loading: boolean;
	error: string | null;
}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
	[key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface GenerateCVState {
	cv: JSONObject | null;
	loading: boolean;
	error: string | null;
}

export interface JobInfo {
	title: string;
	description: string;
	company: string;
	notes?: string;
	file?: File | null;
}
