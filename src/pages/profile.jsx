import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Phone, Calendar, Plus, Camera } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  function handleEditToggle() {
    if (editing) toast.success("Profile updated");
    setEditing((prev) => !prev);
  }

  function handleLogOut() {
    toast.success("Logged out");
    navigate("/");
  }

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: null, // Could add image support later
    joinDate: "January 2024",
    memberSince: "2024",
  };

  const orders = [
    {
      id: "#ORD-001",
      date: "Mar 15, 2024",
      total: 149.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "#ORD-002",
      date: "Feb 28, 2024",
      total: 89.5,
      status: "Delivered",
      items: 1,
    },
    {
      id: "#ORD-003",
      date: "Jan 10, 2024",
      total: 234.0,
      status: "Delivered",
      items: 3,
    },
  ];

  const addresses = [
    {
      type: "Home",
      default: true,
      street: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    {
      type: "Work",
      default: false,
      street: "456 Style Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
  ];

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "addresses", label: "Addresses" },
    { id: "settings", label: "Settings" },
  ];

  const fieldBase =
    "w-full px-4 py-3 rounded-md border text-ink focus:outline-none focus:ring-2 focus:ring-ink/15 focus:border-ink transition-all";

  return (
    <div className="min-h-screen bg-paper pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile Header */}
        <div className="bg-card border border-line rounded-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-ink flex items-center justify-center">
                <span className="font-display text-3xl md:text-4xl font-semibold text-paper">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <button
                aria-label="Change photo"
                className="absolute bottom-0 right-0 bg-clay text-paper p-2 rounded-full hover:bg-clay-deep transition-colors"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-ink mb-1.5">
                {userData.name}
              </h1>
              <p className="text-ink-soft mb-4">{userData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-ink-soft">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-clay" strokeWidth={1.5} />
                  {userData.phone}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-clay" strokeWidth={1.5} />
                  Joined {userData.joinDate}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleEditToggle}
                className="px-6 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-clay-deep transition-colors"
              >
                {editing ? "Save changes" : "Edit profile"}
              </button>
              <button
                onClick={handleLogOut}
                className="px-6 py-2.5 border border-ink/25 text-ink text-sm font-medium rounded-md hover:bg-ink hover:text-paper transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card border border-line rounded-xl overflow-hidden">
          <div className="border-b border-line">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] px-6 py-4 eyebrow transition-colors relative ${
                    activeTab === tab.id
                      ? "text-ink"
                      : "text-ink-faint hover:text-ink-soft"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      value={userData.name.split(" ")[0]}
                      readOnly
                      className={`${fieldBase} border-line bg-paper`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={userData.name.split(" ")[1] || ""}
                      readOnly
                      className={`${fieldBase} border-line bg-paper`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    readOnly={!editing}
                    className={`${fieldBase} ${
                      editing ? "border-ink/30 bg-card" : "border-line bg-paper"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    readOnly={!editing}
                    className={`${fieldBase} ${
                      editing ? "border-ink/30 bg-card" : "border-line bg-paper"
                    }`}
                  />
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-ink-soft">No orders yet</p>
                    <Link
                      to="/"
                      className="eyebrow text-ink link-underline mt-2 inline-block"
                    >
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-line rounded-md p-5 hover:border-ink/20 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="font-medium text-ink">{order.id}</p>
                          <p className="text-sm text-ink-soft">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-display font-semibold text-ink">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-ink-soft">
                              {order.items} item{order.items > 1 ? "s" : ""}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-success-tint text-success text-xs font-semibold rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-5 ${
                      address.default
                        ? "border-ink bg-clay-tint/30"
                        : "border-line"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-ink">{address.type}</span>
                      {address.default && (
                        <span className="eyebrow bg-ink text-paper px-2.5 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink-soft">{address.street}</p>
                    <p className="text-sm text-ink-soft">
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p className="text-sm text-ink-soft">{address.country}</p>
                    <div className="mt-4 flex gap-3">
                      <button className="eyebrow text-ink-soft hover:text-ink transition-colors">
                        Edit
                      </button>
                      <span className="text-line">|</span>
                      <button className="eyebrow text-ink-soft hover:text-danger transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button className="border border-dashed border-ink/30 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-ink hover:bg-clay-tint/20 transition-all min-h-[160px]">
                  <Plus className="h-8 w-8 text-ink-faint mb-2" strokeWidth={1.5} />
                  <span className="eyebrow text-ink-soft">Add new address</span>
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-1">
                <div className="flex items-center justify-between py-4 border-b border-line">
                  <div>
                    <p className="font-medium text-ink">Email notifications</p>
                    <p className="text-sm text-ink-soft">
                      Receive updates about your orders
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-line peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ink/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-line after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ink"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-line">
                  <div>
                    <p className="font-medium text-ink">Two-factor authentication</p>
                    <p className="text-sm text-ink-soft">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-clay-tint text-clay text-sm font-medium rounded-md hover:bg-clay hover:text-paper transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-ink">Language</p>
                    <p className="text-sm text-ink-soft">
                      Select your preferred language
                    </p>
                  </div>
                  <select className="px-4 py-2 border border-line rounded-md text-sm bg-paper text-ink focus:ring-2 focus:ring-ink/15 focus:border-ink">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
