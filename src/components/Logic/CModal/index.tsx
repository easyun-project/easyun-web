import { toast } from 'sonner';
import React, { useState } from 'react';
import { getHostUrl } from '@/utils/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HostModalProps {
    title: string;
    msg: string;
    isVisible: boolean;
    setIsVisible: (v: boolean) => void;
}

export default function HostModal({ title, msg, isVisible, setIsVisible }: HostModalProps) {
    const [hostUrl, setHostUrl] = useState(getHostUrl());

    return (
        <Dialog open={isVisible} onOpenChange={setIsVisible}>
            <DialogContent>
                <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
                <Input placeholder="please input your server url" value={hostUrl}
                    onChange={(e) => setHostUrl(e.target.value)} />
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsVisible(false)}>Cancel</Button>
                    <Button onClick={() => {
                        if (!hostUrl) { toast.warning(msg); return; }
                        localStorage.setItem('server', hostUrl);
                        setIsVisible(false);
                    }}>OK</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
