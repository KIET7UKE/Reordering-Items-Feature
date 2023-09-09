import { useEffect, useState } from 'react';
import { getCoupons, getVouchers, updateCouponSequence, updateVoucherSequence } from './commons/globalFunction';
import { useAtom } from 'jotai';
import { couponsList, vouchersList } from './store/store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [getCouponsList, setCouponsList] = useAtom(couponsList);
  const [getVouchersList, setVouchersList] = useAtom(vouchersList);
  const [, setIsDragging] = useState(false);
  const [isOrderModified, setIsOrderModified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGhvbmVObyI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsInVzZXJUeXBlIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGhvbmVObyI6dHJ1ZSwidXNlclR5cGUiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NGY3M2VhNTRiMjBiNDkxNWZlY2RkYzAiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZU5vIjo5ODYxMTcyOTMxLCJ1c2VyVHlwZSI6IkFkbWluIiwiX192IjowfSwiaWF0IjoxNjk0MjQzNzI3LCJleHAiOjE2OTQzMzAxMjd9.OWR4lGlaqQlsW7JvvZtX3XvewtFCkbdTXtq5GNSZlJU';
        await getCoupons(token, setCouponsList);
        await getVouchers(token, setVouchersList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(getCouponsList.data);

  const handleDragEndCoupon = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedCoupons = [...getCouponsList.data];
    const [movedCoupon] = updatedCoupons.splice(sourceIndex, 1);
    updatedCoupons.splice(destinationIndex, 0, movedCoupon);

    setCouponsList({ data: updatedCoupons });
    setIsOrderModified(true);
    setIsDragging(true);
  };

  const handleDragEndVoucher = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedVouchers = [...getVouchersList.data];
    const [movedVoucher] = updatedVouchers.splice(sourceIndex, 1);
    updatedVouchers.splice(destinationIndex, 0, movedVoucher);

    setVouchersList({ data: updatedVouchers });
    setIsOrderModified(true);
    setIsDragging(true);
  };

  const handleCouponSave = async () => {
    if (isOrderModified) {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGhvbmVObyI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsInVzZXJUeXBlIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGhvbmVObyI6dHJ1ZSwidXNlclR5cGUiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NGY3M2VhNTRiMjBiNDkxNWZlY2RkYzAiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZU5vIjo5ODYxMTcyOTMxLCJ1c2VyVHlwZSI6IkFkbWluIiwiX192IjowfSwiaWF0IjoxNjk0MjQzNzI3LCJleHAiOjE2OTQzMzAxMjd9.OWR4lGlaqQlsW7JvvZtX3XvewtFCkbdTXtq5GNSZlJU';
        await updateCouponSequence(token, getCouponsList.data.map((coupon) => coupon._id));

        setIsDragging(false);
        setIsOrderModified(false);
        toast.success('Coupon re-ordered successfully!');
      } catch (error) {
        console.error('Error updating order:', error);
        setIsDragging(false);
        toast.error('Error updating order');
      }
    } else {
      toast.error('No changes detected');
    }
  };

  const handleVoucherSave = async () => {
    if (isOrderModified) {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGhvbmVObyI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsInVzZXJUeXBlIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGhvbmVObyI6dHJ1ZSwidXNlclR5cGUiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NGY3M2VhNTRiMjBiNDkxNWZlY2RkYzAiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwaG9uZU5vIjo5ODYxMTcyOTMxLCJ1c2VyVHlwZSI6IkFkbWluIiwiX192IjowfSwiaWF0IjoxNjk0MjQzNzI3LCJleHAiOjE2OTQzMzAxMjd9.OWR4lGlaqQlsW7JvvZtX3XvewtFCkbdTXtq5GNSZlJU';
        await updateVoucherSequence(token, getVouchersList.data.map((voucher) => voucher._id));

        setIsDragging(false);
        setIsOrderModified(false);
        toast.success('voucher re-ordered successfully!');
      } catch (error) {
        console.error('Error updating order:', error);
        setIsDragging(false);
        toast.error('Error updating order');
      }
    } else {
      toast.error('No changes detected');
    }
  };

  return (
    <>
    <div className='flex flex-row gap-10 justify-center items-center'>
      <div className='flex flex-col justify-center items-center h-screen text-2xl font-bold'>
        <h1 className='font-bold text-purple-950 mb-10 text-4xl'>Re-order Coupons</h1>
        <DragDropContext onDragEnd={handleDragEndCoupon}>
          <Droppable droppableId={getCouponsList}>
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}
              >
                {getCouponsList?.data && (
                  getCouponsList.data.map((coupon, index) => (
                    <Draggable
                      key={coupon._id}
                      draggableId={coupon._id}
                      index={index}>
                      {(provided) => (
                        <li
                        className='border-2 border-black shadow-lg flex flex-col mb-4 px-10 justify-center items-center'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {coupon.couponName}
                        </li>
                      )}
                    </Draggable>
                  ))
                ) }
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <ToastContainer />
        <button onClick={handleCouponSave} className='text-xl font-semibold text-white bg-emerald-600 px-5 w-[210px] py-2 rounded-md'>Save</button>
      </div>
      <div className='flex flex-col justify-center items-center h-screen text-2xl font-bold'>
        <h1 className='font-bold text-purple-950 mb-10 text-4xl'>Re-order Vouchers</h1>
        <DragDropContext onDragEnd={handleDragEndVoucher}>
          <Droppable droppableId={getVouchersList}>
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}
              >
                {getVouchersList?.data && (
                  getVouchersList.data.map((voucher, index) => (
                    <Draggable
                      key={voucher._id}
                      draggableId={voucher._id}
                      index={index}>
                      {(provided) => (
                        <li
                        className='border-2 border-black shadow-lg flex flex-col mb-4 px-10 justify-center items-center'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {voucher.voucherName}
                        </li>
                      )}
                    </Draggable>
                  ))
                ) }
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <ToastContainer />
        <button onClick={handleVoucherSave} className='text-xl font-semibold text-white bg-emerald-600 px-5 w-[150px] py-2 rounded-md'>Save</button>
      </div>
    </div>
    </>
  );
}

export default App;
