import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

interface EntityImageDialogProps {
    imageUrl: string;
    onClose: () => void;
}

const EntityImageDialog: React.FC<EntityImageDialogProps> = ({ imageUrl, onClose }) => {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent
                showCloseButton={false}
                className="bg-transparent border-transparent"
            >
                <img src={imageUrl} />
            </DialogContent>
        </Dialog>
    )
}

export default EntityImageDialog