import React from 'react';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface SimpleSelectProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    options?: { value: string; label: string }[];
    [key: string]: any;
}

export function SimpleSelect({
    value, defaultValue, onChange, onValueChange, placeholder,
    className, disabled, children, options,
}: SimpleSelectProps) {
    const handleChange = (v: string | null) => {
        if (v !== null) (onChange || onValueChange)?.(v);
    };

    return (
        <Select value={value} defaultValue={defaultValue} onValueChange={handleChange as any} disabled={disabled}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options
                    ? options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)
                    : children}
            </SelectContent>
        </Select>
    );
}

export function SimpleOption({ value, children }: { value: string; children: React.ReactNode }) {
    return <SelectItem value={value}>{children}</SelectItem>;
}
