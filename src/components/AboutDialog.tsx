
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-nexwealth-gold" />
            <span>About NexWealth</span>
          </DialogTitle>
          <DialogDescription>
            Your AI-powered financial assistant
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-gray-700">
            NexWealth is your intelligent financial companion, designed to help you make better financial decisions. 
            Our mission is to democratize financial advice through cutting-edge AI technology.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-medium">What we offer:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Personalized financial guidance</li>
              <li>Investment strategy recommendations</li>
              <li>Budgeting and savings advice</li>
              <li>Educational resources on financial literacy</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
