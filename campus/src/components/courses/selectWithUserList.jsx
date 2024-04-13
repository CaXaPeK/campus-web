import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import {API_URLS} from "../../constants/apiUrls.js";
import {api} from "../../api/axiosInstance.js";

export function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = async (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            try {
                const newOptions = await fetchOptions(value);
                if (fetchId !== fetchRef.current) {
                    return;
                }
                setOptions(newOptions);
            } catch (error) {
                console.error('Error fetching options:', error);
            } finally {
                setFetching(false);
            }
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    useEffect(() => {
        debounceFetcher('');
    }, [debounceFetcher]);

    return (
        <Select
            labelInValue
            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

export async function fetchUserList(username) {
    console.log('fetching user', username);
    try {
        const response = await api.get(API_URLS.BASE + API_URLS.USERS);
        const userList = response.data.map((user) => ({
            label: user.fullName,
            value: user.id,
        }));
        return userList;
    } catch (error) {
        console.error('Error fetching user list:', error);
        throw error;
    }
}