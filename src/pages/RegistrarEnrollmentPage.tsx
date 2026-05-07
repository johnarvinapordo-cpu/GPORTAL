useEffect(() => {
  loadPending();
}, []);

const loadPending = async () => {
  try {
    const data = await apiRequest("/api/enrollments/pending");
    setPending(data);
  } catch (err) {
    console.error(err);
  }
};

const approve = async (id: number) => {
  try {
    await apiRequest("/api/enrollments/approve", {
      method: "POST",
      body: JSON.stringify({ enrollmentId: id }),
    });

    toast.success("Approved");
    loadPending();
  } catch (err) {
    console.error(err);
    toast.error("Approval failed");
  }
};