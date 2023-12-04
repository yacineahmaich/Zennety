import { Card } from "../ui/card";

const BoardCard = () => {
  return (
    <Card className=" bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/6cfd81c00dcbe11c24e47049d150cbe4/photo-1691418173358-492743391cf5.jpg')] bg-cover bg-center">
      <div className="relative h-28 rounded-[inherit] bg-black/30 p-4">
        <h3 className="text-sm font-bold text-white">Ecowatt</h3>
      </div>
    </Card>
  );
};

export default BoardCard;
